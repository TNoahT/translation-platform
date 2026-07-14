import { useEffect, useRef, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { TextAreaField } from './TextAreaField';
import { LanguageSelect } from './LanguageSelect';
import { CategorySelect } from './CategorySelect';
import { StarRating } from './StarRating';
import { TagInput } from './TagInput';
import { CheckboxField } from './CheckboxField';
import { StatusBanner } from './StatusBanner';
import { detectLanguage } from '../lib/detectLanguage';
import { submitTranslation } from '../lib/api';
import { loadDraft, clearDraft, useAutosaveDraft } from '../hooks/useAutosaveDraft';
import { useLocale } from '../lib/i18n/LocaleContext';
import type { AuthUser, Category, SubmissionFormData } from '../types';

const EMPTY_FORM: SubmissionFormData = {
  sourceText: '',
  sourceLanguage: '',
  sourceLanguageManual: false,
  targetText: '',
  targetLanguage: '',
  targetLanguageManual: false,
  explanation: '',
  category: '',
  difficulty: 0,
  tags: [],
  consentPublicDataset: false,
};

type FieldErrors = Partial<Record<keyof SubmissionFormData, string>>;

interface SubmissionFormProps {
  user: AuthUser;
}

export function SubmissionForm({ user }: SubmissionFormProps) {
  const { t } = useLocale();
  const [form, setForm] = useState<SubmissionFormData>(() => ({
    ...EMPTY_FORM,
    ...loadDraft(),
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [detectingSource, setDetectingSource] = useState(false);
  const [detectingTarget, setDetectingTarget] = useState(false);
  const [banner, setBanner] = useState<{ kind: 'success' | 'error'; message: string } | null>(
    null,
  );

  useAutosaveDraft(form);

  function update<K extends keyof SubmissionFormData>(key: K, value: SubmissionFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  // --- Automatic language detection, debounced while typing ---------------
  useDebouncedDetection(form.sourceText, form.sourceLanguageManual, setDetectingSource, (code) =>
    setForm((prev) => (prev.sourceLanguageManual ? prev : { ...prev, sourceLanguage: code ?? '' })),
  );
  useDebouncedDetection(form.targetText, form.targetLanguageManual, setDetectingTarget, (code) =>
    setForm((prev) => (prev.targetLanguageManual ? prev : { ...prev, targetLanguage: code ?? '' })),
  );

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.sourceText.trim()) next.sourceText = t('validationSourceText');
    if (!form.targetText.trim()) next.targetText = t('validationTargetText');
    if (!form.explanation.trim()) next.explanation = t('validationExplanation');
    if (!form.category) next.category = t('validationCategory');
    if (!form.difficulty) next.difficulty = t('validationDifficulty');
    if (!form.sourceLanguage) next.sourceLanguage = t('validationSourceLanguage');
    if (!form.targetLanguage) next.targetLanguage = t('validationTargetLanguage');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBanner(null);
    if (!validate()) {
      setBanner({ kind: 'error', message: t('formHasErrors') });
      return;
    }

    setSubmitting(true);
    const result = await submitTranslation(user, form);
    setSubmitting(false);

    if (result.ok) {
      setBanner({ kind: 'success', message: t('submitSuccess') });
      clearDraft();
      setForm(EMPTY_FORM);
    } else {
      setBanner({
        kind: 'error',
        message: result.error ?? t('submitGenericError'),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {banner && <StatusBanner kind={banner.kind} message={banner.message} />}

      <TextAreaField
        id="sourceText"
        label={t('sourceTextLabel')}
        tooltip={t('sourceTextTooltip')}
        required
        maxLength={2000}
        value={form.sourceText}
        error={errors.sourceText}
        onChange={(e) => update('sourceText', e.target.value)}
      />

      <LanguageSelect
        id="sourceLanguage"
        label={t('sourceLanguageLabel')}
        value={form.sourceLanguage}
        isAuto={!form.sourceLanguageManual}
        detecting={detectingSource}
        error={errors.sourceLanguage}
        onChange={(code) =>
          setForm((prev) => ({ ...prev, sourceLanguage: code, sourceLanguageManual: true }))
        }
      />

      <TextAreaField
        id="targetText"
        label={t('targetTextLabel')}
        tooltip={t('targetTextTooltip')}
        required
        maxLength={2000}
        value={form.targetText}
        error={errors.targetText}
        onChange={(e) => update('targetText', e.target.value)}
      />

      <LanguageSelect
        id="targetLanguage"
        label={t('targetLanguageLabel')}
        value={form.targetLanguage}
        isAuto={!form.targetLanguageManual}
        detecting={detectingTarget}
        error={errors.targetLanguage}
        onChange={(code) =>
          setForm((prev) => ({ ...prev, targetLanguage: code, targetLanguageManual: true }))
        }
      />

      <TextAreaField
        id="explanation"
        label={t('explanationLabel')}
        tooltip={t('explanationPlaceholder')}
        placeholder={t('explanationPlaceholder')}
        required
        maxLength={1000}
        value={form.explanation}
        error={errors.explanation}
        onChange={(e) => update('explanation', e.target.value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <CategorySelect
          id="category"
          value={form.category}
          error={errors.category}
          onChange={(value: Category) => update('category', value)}
        />
        <StarRating
          id="difficulty"
          value={form.difficulty}
          error={errors.difficulty}
          onChange={(value) => update('difficulty', value)}
        />
      </div>

      <TagInput id="tags" tags={form.tags} onChange={(tags) => update('tags', tags)} />

      <CheckboxField
        id="consentPublicDataset"
        checked={form.consentPublicDataset}
        onChange={(checked) => update('consentPublicDataset', checked)}
        label={t('consentLabel')}
        description={t('consentDescription')}
      />

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-ring disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {t('submittingButton')}
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              {t('submitButton')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** Runs franc detection ~400ms after typing stops, skipping entirely once
 * the user has manually overridden the language for that field. */
function useDebouncedDetection(
  text: string,
  manual: boolean,
  setDetecting: (v: boolean) => void,
  apply: (code: string | null) => void,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (manual) return;
    if (timer.current) clearTimeout(timer.current);

    if (!text.trim()) {
      apply(null);
      return;
    }

    setDetecting(true);
    timer.current = setTimeout(() => {
      const result = detectLanguage(text);
      apply(result.code);
      setDetecting(false);
    }, 400);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, manual]);
}