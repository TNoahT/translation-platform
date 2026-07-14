import { CATEGORY_OPTIONS, type Category } from '../../types';

export type Locale = 'en' | 'fr';

export const LOCALES: Locale[] = ['en', 'fr'];

/**
 * All UI chrome text lives here, keyed by a short identifier with an
 * { en, fr } pair. Adding a third language later means adding a third
 * key to each entry (and to `Locale`/`LOCALES` above) — nothing else in
 * the app needs to change.
 *
 * Category names and difficulty labels are translated separately below,
 * since they map from fixed English data values (stored as-is in the
 * spreadsheet) to a locale-specific display label.
 */
export const STRINGS = {
  projectSubtitleMain: {
    en: 'Help us build a high-quality dataset of challenging translation examples.',
    fr: "Aidez-nous à construire un ensemble de données de haute qualité d'exemples de traductions difficiles.",
  },
  signInSubtitle: {
    en: 'This is an invitation-only research tool. Sign in with the account you were invited with to submit examples.',
    fr: "Cet outil de recherche est réservé aux personnes invitées. Connectez-vous avec le compte avec lequel vous avez été invité(e) pour soumettre des exemples.",
  },
  loadingSignIn: { en: 'Loading sign-in…', fr: 'Chargement de la connexion…' },
  orDivider: { en: 'or', fr: 'ou' },
  noGoogleAccount: {
    en: "No Google account? Sign in with just your email instead.",
    fr: 'Pas de compte Google\u00a0? Connectez-vous simplement avec votre e-mail.',
  },
  checkingAccess: { en: 'Checking access…', fr: 'Vérification de l\u2019accès…' },

  emailAddressLabel: { en: 'Email address', fr: 'Adresse e-mail' },
  emailPlaceholder: { en: 'you@university.edu', fr: 'vous@universite.fr' },
  sendLinkButton: { en: 'Send link', fr: 'Envoyer le lien' },
  checkInboxTitle: { en: 'Check your inbox', fr: 'Consultez votre boîte de réception' },
  checkInboxBody: {
    en: 'If {email} is on the invite list, a sign-in link just landed there. It expires in 15 minutes.',
    fr: 'Si {email} figure sur la liste des invités, un lien de connexion vient d\u2019y être envoyé. Il expire dans 15 minutes.',
  },
  useDifferentEmail: { en: 'Use a different email', fr: 'Utiliser une autre adresse e-mail' },

  finishSignInTitle: { en: 'Finish signing in', fr: 'Terminer la connexion' },
  finishSignInBody: {
    en: 'Click below to complete your sign-in.',
    fr: 'Cliquez ci-dessous pour terminer votre connexion.',
  },
  continueButton: { en: 'Continue', fr: 'Continuer' },
  signingInButton: { en: 'Signing you in…', fr: 'Connexion en cours…' },
  backToSignIn: { en: 'Back to sign in', fr: 'Retour à la connexion' },

  accessDeniedTitle: { en: 'Access denied', fr: 'Accès refusé' },
  accessDeniedBody: {
    en: "{email} isn't on the list of invited contributors yet. If you believe this is a mistake, please reach out to the project organizer to be added.",
    fr: '{email} ne figure pas encore sur la liste des contributeurs invités. Si vous pensez qu\u2019il s\u2019agit d\u2019une erreur, contactez l\u2019organisateur du projet pour être ajouté(e).',
  },
  tryDifferentAccount: { en: 'Try a different account', fr: 'Essayer un autre compte' },

  switchToLightMode: { en: 'Switch to light mode', fr: 'Passer au mode clair' },
  switchToDarkMode: { en: 'Switch to dark mode', fr: 'Passer au mode sombre' },
  signOutAria: { en: 'Sign out', fr: 'Se déconnecter' },
  switchToFrench: { en: 'Switch to French', fr: 'Passer en français' },
  switchToEnglish: { en: 'Switch to English', fr: 'Passer en anglais' },

  sourceTextLabel: { en: 'Source text', fr: 'Texte source' },
  sourceTextTooltip: {
    en: 'Paste the original text, in its source language.',
    fr: 'Collez le texte original, dans sa langue source.',
  },
  sourceLanguageLabel: { en: 'Source language', fr: 'Langue source' },
  targetTextLabel: { en: 'Target text', fr: 'Texte cible' },
  targetTextTooltip: {
    en: 'Paste the (imperfect or difficult) translation.',
    fr: 'Collez la traduction (imparfaite ou difficile).',
  },
  targetLanguageLabel: { en: 'Target language', fr: 'Langue cible' },
  explanationLabel: {
    en: 'Why is this translation difficult?',
    fr: 'Pourquoi cette traduction est-elle difficile\u00a0?',
  },
  explanationPlaceholder: {
    en: 'e.g. terminology, ambiguity, idiomatic expression, cultural reference, wordplay, domain-specific vocabulary…',
    fr: 'ex. : terminologie, ambiguïté, expression idiomatique, référence culturelle, jeu de mots, vocabulaire spécialisé…',
  },
  categoryLabel: { en: 'Category', fr: 'Catégorie' },
  selectCategoryPlaceholder: { en: 'Select a category…', fr: 'Sélectionnez une catégorie…' },
  difficultyLabel: { en: 'Difficulty', fr: 'Difficulté' },
  difficultyAriaLabel: { en: '{n} out of 10 — {label}', fr: '{n} sur 10 — {label}' },
  tagsLabel: { en: 'Tags', fr: 'Étiquettes' },
  tagsTooltip: {
    en: "Add keywords like 'medical', 'finance', or 'biology' to help future filtering.",
    fr: 'Ajoutez des mots-clés comme «\u00a0médical\u00a0», «\u00a0finance\u00a0» ou «\u00a0biologie\u00a0» pour faciliter le filtrage ultérieur.',
  },
  tagsPlaceholder: { en: 'medical, finance, biology…', fr: 'médical, finance, biologie…' },
  removeTagAria: { en: 'Remove tag {tag}', fr: 'Supprimer l\u2019étiquette {tag}' },

  consentLabel: {
    en: 'This example may be used in a public dataset',
    fr: 'Cet exemple peut être utilisé dans un jeu de données public',
  },
  consentDescription: {
    en: 'If checked, this submission (including the text you entered) may be released as part of a publicly shared research dataset. Leave unchecked to keep it for internal research use only.',
    fr: 'Si cette case est cochée, cette soumission (y compris le texte saisi) pourra être publiée dans le cadre d\u2019un jeu de données de recherche partagé publiquement. Laissez la case décochée pour un usage de recherche interne uniquement.',
  },

  submitButton: { en: 'Submit example', fr: 'Soumettre l\u2019exemple' },
  submittingButton: { en: 'Submitting…', fr: 'Envoi en cours…' },

  validationSourceText: { en: 'Source text is required.', fr: 'Le texte source est requis.' },
  validationTargetText: { en: 'Target text is required.', fr: 'Le texte cible est requis.' },
  validationExplanation: {
    en: 'Please explain why this is difficult.',
    fr: 'Veuillez expliquer pourquoi cette traduction est difficile.',
  },
  validationCategory: { en: 'Please choose a category.', fr: 'Veuillez choisir une catégorie.' },
  validationDifficulty: { en: 'Please rate the difficulty.', fr: 'Veuillez évaluer la difficulté.' },
  validationSourceLanguage: {
    en: 'Please select the source language.',
    fr: 'Veuillez sélectionner la langue source.',
  },
  validationTargetLanguage: {
    en: 'Please select the target language.',
    fr: 'Veuillez sélectionner la langue cible.',
  },
  formHasErrors: {
    en: 'Please fix the highlighted fields before submitting.',
    fr: 'Veuillez corriger les champs surlignés avant de soumettre.',
  },
  submitSuccess: {
    en: 'Thank you! Your translation example has been submitted.',
    fr: 'Merci\u00a0! Votre exemple de traduction a été envoyé.',
  },
  submitGenericError: {
    en: 'Something went wrong while submitting. Please try again.',
    fr: 'Une erreur est survenue lors de l\u2019envoi. Veuillez réessayer.',
  },

  selectLanguagePlaceholder: { en: 'Select a language…', fr: 'Sélectionnez une langue…' },
  searchLanguagesPlaceholder: { en: 'Search languages…', fr: 'Rechercher une langue…' },
  noMatches: { en: 'No matches', fr: 'Aucun résultat' },
  detectingLanguage: { en: 'Detecting language…', fr: 'Détection de la langue…' },
  detectedLanguagePrefix: { en: 'Detected language: {name}', fr: 'Langue détectée\u00a0: {name}' },
  languageUndetermined: {
    en: 'Language could not be determined.',
    fr: 'La langue n\u2019a pas pu être déterminée.',
  },
} satisfies Record<string, Record<Locale, string>>;

export type StringKey = keyof typeof STRINGS;

/**
 * Difficulty scale labels (index 0 = difficulty 1, index 9 = difficulty
 * 10), per locale.
 */
export const DIFFICULTY_LABELS: Record<Locale, string[]> = {
  en: [
    'Trivial',
    'Very easy',
    'Easy',
    'Somewhat easy',
    'Moderate',
    'Somewhat hard',
    'Hard',
    'Very hard',
    'Extremely hard',
    'Nearly untranslatable',
  ],
  fr: [
    'Trivial',
    'Très facile',
    'Facile',
    'Assez facile',
    'Modéré',
    'Assez difficile',
    'Difficile',
    'Très difficile',
    'Extrêmement difficile',
    'Presque intraduisible',
  ],
};

/**
 * Display labels for each fixed Category value. The underlying value
 * stored in the spreadsheet (e.g. "Cultural reference") never changes
 * with locale — only what's shown in the dropdown does.
 */
export const CATEGORY_LABELS: Record<Category, Record<Locale, string>> = {
  Terminology: { en: 'Terminology', fr: 'Terminologie' },
  Grammar: { en: 'Grammar', fr: 'Grammaire' },
  Syntax: { en: 'Syntax', fr: 'Syntaxe' },
  Ambiguity: { en: 'Ambiguity', fr: 'Ambiguïté' },
  Idiom: { en: 'Idiom', fr: 'Expression idiomatique' },
  'Cultural reference': { en: 'Cultural reference', fr: 'Référence culturelle' },
  'Named entities': { en: 'Named entities', fr: 'Entités nommées' },
  Formatting: { en: 'Formatting', fr: 'Mise en forme' },
  'Scientific language': { en: 'Scientific language', fr: 'Langage scientifique' },
  'Legal language': { en: 'Legal language', fr: 'Langage juridique' },
  'Medical language': { en: 'Medical language', fr: 'Langage médical' },
  Other: { en: 'Other', fr: 'Autre' },
};

// Sanity check at module load, in dev, that every Category has a label.
// (Not a runtime error path in production — just documents the invariant.)
CATEGORY_OPTIONS.forEach((c) => {
  if (!CATEGORY_LABELS[c]) {
    // eslint-disable-next-line no-console
    console.warn(`Missing CATEGORY_LABELS entry for category "${c}"`);
  }
});