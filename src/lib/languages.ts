import type { LanguageOption } from '../types';

/**
 * Languages offered in the searchable dropdowns. This list intentionally
 * covers the languages a translation-research group is likely to work
 * with; add more rows here as needed — nothing else needs to change.
 */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' }
];

const CODE_TO_NAME = new Map(LANGUAGE_OPTIONS.map((l) => [l.code, l.name]));

export function languageName(code: string): string | null {
  return CODE_TO_NAME.get(code) ?? null;
}

/**
 * `franc` reports languages as ISO 639-3 codes (e.g. "eng", "fra"), while
 * the rest of the app uses the shorter, more familiar ISO 639-1 codes
 * (e.g. "en", "fr") for both storage and the dropdown. This table maps
 * between the two for every language we offer, plus a few common extras
 * so detection doesn't silently fail on nearby languages.
 */
export const ISO_639_3_TO_1: Record<string, string> = {
  eng: 'en',
  fra: 'fr',
  deu: 'de',
  spa: 'es',
  por: 'pt',
  ita: 'it',
  nld: 'nl',
  rus: 'ru',
  pol: 'pl',
  ukr: 'uk',
  cmn: 'zh',
  zho: 'zh',
  jpn: 'ja',
  kor: 'ko',
  arb: 'ar',
  ara: 'ar',
  heb: 'he',
  hin: 'hi',
  ben: 'bn',
  urd: 'ur',
  pes: 'fa',
  fas: 'fa',
  tur: 'tr',
  vie: 'vi',
  tha: 'th',
  ind: 'id',
  zsm: 'ms',
  msa: 'ms',
  tgl: 'tl',
  swh: 'sw',
  swa: 'sw',
  amh: 'am',
  ell: 'el',
  ces: 'cs',
  swe: 'sv',
  nob: 'no',
  nno: 'no',
  dan: 'da',
  fin: 'fi',
  hun: 'hu',
  ron: 'ro',
  bul: 'bg',
  srp: 'sr',
  hrv: 'hr',
  slk: 'sk',
};
