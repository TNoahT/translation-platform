import type { Locale } from '../lib/i18n/strings';

/**
 * Edit this file to describe your own project. It's kept separate from
 * `src/lib/i18n/strings.ts` (which holds generic UI chrome like button
 * labels) because this is *content* a project maintainer is expected to
 * customize, not code.
 *
 * Add as many paragraphs as you like — each string in `paragraphs`
 * renders as its own <p>.
 */
export const PROJECT_INTRO: Record<Locale, { title: string; paragraphs: string[] }> = {
  en: {
    title: 'About this project',
    paragraphs: [
      'This tool collects real-world examples of machine translation that are hard to get right — idioms, ambiguous phrasing, cultural references, technical jargon, and more.',
      'Submissions are reviewed by our research team and used to study where translation systems struggle. Your example is kept for internal research use only, unless you opt in below to let it be included in a public dataset release.',
    ],
  },
  fr: {
    title: 'À propos de ce projet',
    paragraphs: [
      "Cet outil recueille des exemples concrets de traduction automatique difficiles à réaliser correctement\u00a0: expressions idiomatiques, formulations ambiguës, références culturelles, jargon technique, et plus encore.",
      "Les soumissions sont examinées par notre équipe de recherche et utilisées pour étudier les difficultés des systèmes de traduction. Votre exemple est conservé uniquement à des fins de recherche interne, sauf si vous choisissez ci-dessous de l'inclure dans un jeu de données publié publiquement.",
    ],
  },
};