import type { Category } from '../../types';

export type Locale = 'en' | 'fr';

export const LOCALES: Locale[] = ['en', 'fr'];

/**
 * Flat dictionary of every piece of translatable UI text, keyed by a
 * short id. `t(key, params?)` (see LocaleContext.tsx) looks values up
 * here and substitutes `{placeholder}` tokens with `params`.
 *
 * Keep keys identical across `en` and `fr` — TypeScript's `Record<Locale,
 * ...>` below will catch a missing translation at compile time.
 */
type Dictionary = Record<string, string>;

export const TRANSLATIONS: Record<Locale, Dictionary> = {
  en: {
    // Header
    switchToFrench: 'Switch to French',
    switchToEnglish: 'Switch to English',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
    signOutAria: 'Sign out',

    // Sign-in screen
    signInSubtitle:
      'This is an invitation-only research tool. Sign in with the account you were invited with to submit examples.',
    loadingSignIn: 'Loading sign-in…',
    orDivider: 'or',
    noGoogleAccount: "No Google account? Sign in with just your email instead.",

    // Email magic-link form
    emailAddressLabel: 'Email address',
    emailPlaceholder: 'you@university.edu',
    sendLinkButton: 'Send link',
    checkInboxTitle: 'Check your inbox',
    checkInboxBody: 'If {email} is on the invite list, a sign-in link just landed there. It expires in 15 minutes.',
    useDifferentEmail: 'Use a different email',

    // Complete-sign-in (magic link landing) screen
    finishSignInTitle: 'Finish signing in',
    finishSignInBody: 'Click below to complete your sign-in.',
    continueButton: 'Continue',
    signingInButton: 'Signing you in…',
    backToSignIn: 'Back to sign in',

    // Access denied screen
    accessDeniedTitle: 'Access denied',
    accessDeniedBody:
      "{email} isn't on the list of invited contributors yet. If you believe this is a mistake, please reach out to the project organizer to be added.",
    tryDifferentAccount: 'Try a different account',

    // App shell
    checkingAccess: 'Checking access…',
    projectSubtitleMain: 'Help us build a high-quality dataset of challenging translation examples.',

    // Submission form fields
    sourceTextLabel: 'Source text',
    sourceTextTooltip: 'Paste the original text, in its source language.',
    sourceLanguageLabel: 'Source language',
    targetTextLabel: 'Target text',
    targetTextTooltip: 'Paste the (imperfect or difficult) translation.',
    targetLanguageLabel: 'Target language',

    // Submission guidelines notice (shown above the form fields)
    guidelinesTitle: 'Before you submit',
    guidelinesTranslatability:
      'Make sure your example can be understood and translated by a human using only the information provided here. If extra context is needed — for example, a regional variant like French (France) vs. French (Canada), or background not present in the text — add it in the "Additional information" field below.',
    guidelinesConfidentiality:
      "Please don't include confidential, proprietary, or personal information in your example. Submissions are visible to the research team administering this project.",

    additionalInfoLabel: 'Additional information to consider for the translation',
    additionalInfoTooltip:
      'Optional. Anything a human translator would need but that isn\u2019t in the text itself — a regional language variant, missing context, intended audience, etc.',
    additionalInfoPlaceholder:
      'e.g. this was translated into French (France) rather than French (Canada); the audience is a medical professional; this quote is from a 1990s news article…',

    explanationLabel: 'Why is this translation difficult?',
    explanationPlaceholder:
      'e.g. terminology, ambiguity, idiomatic expression, cultural reference, wordplay, domain-specific vocabulary…',
    categoryLabel: 'Category',
    selectCategoryPlaceholder: 'Select a category…',
    difficultyLabel: 'Difficulty',
    difficultyAriaLabel: '{n} out of 10 — {label}',
    tagsLabel: 'Tags',
    tagsTooltip: "Add keywords like 'medical', 'finance', or 'biology' to help future filtering.",
    tagsPlaceholder: 'medical, finance, biology…',
    removeTagAria: 'Remove tag {tag}',
    anonymousLabel: 'Submit anonymously',
    anonymousDescription:
      "If checked, your name and email won't be recorded with this submission. We'll label it with a random nickname instead, so the research team can still tell submissions from the same session apart without knowing who submitted them.",
    consentLabel: 'This example may be used in a public dataset',
    consentDescription:
      'If checked, this submission (including the text you entered) may be released as part of a publicly shared research dataset. Leave unchecked to keep it for internal research use only. Before opting in, double-check that your example doesn\u2019t contain confidential or personal information.',
    creditLabel: 'I\u2019d like to be listed as a contributor in the public dataset credits',
    creditDescription:
      'Your account name/email are never used for this automatically — you choose exactly what to display below, independent of whether you submitted anonymously.',
    creditNameLabel: 'Name to display in the credits',
    creditNameTooltip:
      'Pre-filled with your account name — feel free to change it to a nickname or however you\u2019d like to be credited.',
    creditNamePlaceholder: 'e.g. Jane D., or a pseudonym',
    validationCreditName: 'Please enter a name to display, or uncheck the box above.',
    submitButton: 'Submit example',
    submittingButton: 'Submitting…',
    submitSuccess: 'Thank you! Your translation example has been submitted.',
    formHasErrors: 'Please fix the highlighted fields before submitting.',
    submitGenericError: 'Something went wrong while submitting. Please try again.',
    validationSourceText: 'Source text is required.',
    validationTargetText: 'Target text is required.',
    validationExplanation: 'Please explain why this is difficult.',
    validationCategory: 'Please choose a category.',
    validationDifficulty: 'Please rate the difficulty.',
    validationSourceLanguage: 'Please select the source language.',
    validationTargetLanguage: 'Please select the target language.',

    // Language dropdown (for source/target text language, not UI language)
    selectLanguagePlaceholder: 'Select a language…',
    searchLanguagesPlaceholder: 'Search languages…',
    noMatches: 'No matches',
    detectingLanguage: 'Detecting language…',
    detectedLanguagePrefix: 'Detected language: {name}',
    languageUndetermined: 'Language could not be determined.',
  },
  fr: {
    // Header
    switchToFrench: 'Passer en français',
    switchToEnglish: 'Switch to English',
    switchToLightMode: 'Passer au mode clair',
    switchToDarkMode: 'Passer au mode sombre',
    signOutAria: 'Se déconnecter',

    // Sign-in screen
    signInSubtitle:
      "Cet outil de recherche est réservé aux personnes invitées. Connectez-vous avec le compte utilisé pour votre invitation afin de soumettre des exemples.",
    loadingSignIn: 'Chargement de la connexion…',
    orDivider: 'ou',
    noGoogleAccount: "Pas de compte Google ? Connectez-vous simplement avec votre e-mail.",

    // Email magic-link form
    emailAddressLabel: 'Adresse e-mail',
    emailPlaceholder: 'vous@universite.fr',
    sendLinkButton: 'Envoyer le lien',
    checkInboxTitle: 'Consultez votre boîte de réception',
    checkInboxBody:
      "Si {email} figure sur la liste des invités, un lien de connexion vient d'y être envoyé. Il expire dans 15 minutes.",
    useDifferentEmail: 'Utiliser une autre adresse e-mail',

    // Complete-sign-in (magic link landing) screen
    finishSignInTitle: 'Terminer la connexion',
    finishSignInBody: 'Cliquez ci-dessous pour terminer votre connexion.',
    continueButton: 'Continuer',
    signingInButton: 'Connexion en cours…',
    backToSignIn: 'Retour à la connexion',

    // Access denied screen
    accessDeniedTitle: 'Accès refusé',
    accessDeniedBody:
      "{email} ne figure pas encore sur la liste des contributeurs invités. Si vous pensez qu'il s'agit d'une erreur, contactez l'organisateur du projet pour être ajouté.",
    tryDifferentAccount: 'Essayer un autre compte',

    // App shell
    checkingAccess: "Vérification de l'accès…",
    projectSubtitleMain:
      'Aidez-nous à construire un jeu de données de haute qualité rassemblant des exemples de traduction difficiles.',

    // Submission form fields
    sourceTextLabel: 'Texte source',
    sourceTextTooltip: 'Collez le texte original, dans sa langue source.',
    sourceLanguageLabel: 'Langue source',
    targetTextLabel: 'Texte cible',
    targetTextTooltip: 'Collez la traduction (imparfaite ou difficile).',
    targetLanguageLabel: 'Langue cible',

    // Submission guidelines notice (shown above the form fields)
    guidelinesTitle: 'Avant de soumettre',
    guidelinesTranslatability:
      "Assurez-vous que votre exemple peut être compris et traduit par un humain à partir uniquement des informations fournies ici. Si un contexte supplémentaire est nécessaire — par exemple une variante régionale comme le français (France) par rapport au français (Canada), ou des informations absentes du texte — ajoutez-les dans le champ « Informations complémentaires » ci-dessous.",
    guidelinesConfidentiality:
      "Merci de ne pas inclure d'informations confidentielles, protégées ou personnelles dans votre exemple. Les soumissions sont visibles par l'équipe de recherche responsable de ce projet.",

    additionalInfoLabel: 'Informations complémentaires à considérer pour la traduction',
    additionalInfoTooltip:
      "Facultatif. Tout ce dont un traducteur humain aurait besoin mais qui ne figure pas dans le texte lui-même\u00a0: une variante régionale de la langue, un contexte manquant, le public visé, etc.",
    additionalInfoPlaceholder:
      "ex.\u00a0: ceci a été traduit en français (France) plutôt qu'en français (Canada)\u00a0; le public visé est un professionnel de la santé\u00a0; cette citation provient d'un article de presse des années 1990…",

    explanationLabel: 'Pourquoi cette traduction est-elle difficile ?',
    explanationPlaceholder:
      'ex. terminologie, ambiguïté, expression idiomatique, référence culturelle, jeu de mots, vocabulaire spécialisé…',
    categoryLabel: 'Catégorie',
    selectCategoryPlaceholder: 'Sélectionnez une catégorie…',
    difficultyLabel: 'Difficulté',
    difficultyAriaLabel: '{n} sur 10 — {label}',
    tagsLabel: 'Étiquettes',
    tagsTooltip:
      "Ajoutez des mots-clés comme « médical », « finance » ou « biologie » pour faciliter un futur filtrage.",
    tagsPlaceholder: 'médical, finance, biologie…',
    removeTagAria: "Supprimer l'étiquette {tag}",
    anonymousLabel: 'Soumettre anonymement',
    anonymousDescription:
      "Si cette case est cochée, votre nom et votre e-mail ne seront pas enregistrés avec cette soumission. Un pseudonyme aléatoire sera utilisé à la place, afin que l'équipe de recherche puisse distinguer les soumissions d'une même session sans savoir qui les a envoyées.",
    consentLabel: 'Cet exemple peut être utilisé dans un jeu de données public',
    consentDescription:
      "Si cette case est cochée, cette soumission (y compris le texte saisi) pourra être publiée dans un jeu de données de recherche accessible au public. Laissez la case décochée pour un usage de recherche interne uniquement. Avant de cocher cette case, vérifiez que votre exemple ne contient pas d'informations confidentielles ou personnelles.",
    creditLabel: "Je souhaite être mentionné(e) comme contributeur/contributrice dans les crédits du jeu de données public",
    creditDescription:
      "Le nom ou l'e-mail de votre compte ne sont jamais utilisés automatiquement pour cela\u00a0: vous choisissez exactement ce qui sera affiché ci-dessous, indépendamment du fait que vous ayez soumis anonymement ou non.",
    creditNameLabel: 'Nom à afficher dans les crédits',
    creditNameTooltip:
      "Pré-rempli avec le nom associé à votre compte\u00a0: modifiez-le librement pour un pseudonyme ou toute autre façon dont vous souhaitez être mentionné(e).",
    creditNamePlaceholder: 'ex.\u00a0: Jane D., ou un pseudonyme',
    validationCreditName: 'Veuillez indiquer un nom à afficher, ou décochez la case ci-dessus.',
    submitButton: "Soumettre l'exemple",
    submittingButton: 'Envoi en cours…',
    submitSuccess: 'Merci ! Votre exemple de traduction a bien été soumis.',
    formHasErrors: 'Veuillez corriger les champs en surbrillance avant de soumettre.',
    submitGenericError: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
    validationSourceText: 'Le texte source est requis.',
    validationTargetText: 'Le texte cible est requis.',
    validationExplanation: 'Veuillez expliquer pourquoi ce texte est difficile.',
    validationCategory: 'Veuillez choisir une catégorie.',
    validationDifficulty: 'Veuillez évaluer la difficulté.',
    validationSourceLanguage: 'Veuillez sélectionner la langue source.',
    validationTargetLanguage: 'Veuillez sélectionner la langue cible.',

    // Language dropdown (for source/target text language, not UI language)
    selectLanguagePlaceholder: 'Sélectionnez une langue…',
    searchLanguagesPlaceholder: 'Rechercher une langue…',
    noMatches: 'Aucun résultat',
    detectingLanguage: 'Détection de la langue…',
    detectedLanguagePrefix: 'Langue détectée : {name}',
    languageUndetermined: "La langue n'a pas pu être déterminée.",
  },
};

/**
 * Displayed category labels. The `value` actually stored/submitted stays
 * the fixed English key (from CATEGORY_OPTIONS in types/index.ts) — only
 * what's shown to the user changes with locale — so the "Category"
 * column in the spreadsheet is always consistent regardless of which
 * language a contributor used.
 */
export const CATEGORY_LABELS: Record<Category, Record<Locale, string>> = {
  Terminology: { en: 'Terminology', fr: 'Terminologie' },
  Grammar: { en: 'Grammar', fr: 'Grammaire' },
  Syntax: { en: 'Syntax', fr: 'Syntaxe' },
  Ambiguity: { en: 'Ambiguity', fr: 'Ambiguïté' },
  Idiom: { en: 'Idiom', fr: 'Idiome' },
  'Cultural reference': { en: 'Cultural reference', fr: 'Référence culturelle' },
  'Named entities': { en: 'Named entities', fr: 'Entités nommées' },
  Formatting: { en: 'Formatting', fr: 'Mise en forme' },
  'Scientific language': { en: 'Scientific language', fr: 'Langage scientifique' },
  'Legal language': { en: 'Legal language', fr: 'Langage juridique' },
  'Medical language': { en: 'Medical language', fr: 'Langage médical' },
  Other: { en: 'Other', fr: 'Autre' },
};

/** Difficulty scale labels, index 0 = difficulty 1 through index 9 = difficulty 10. */
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
    'Triviale',
    'Très facile',
    'Facile',
    'Plutôt facile',
    'Modérée',
    'Plutôt difficile',
    'Difficile',
    'Très difficile',
    'Extrêmement difficile',
    'Presque intraduisible',
  ],
};