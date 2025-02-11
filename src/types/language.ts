export interface LanguageProficiency {
  id: number;
  proficiency: string;
}

export type Languages = {
  [key: string]: string;
};

export interface Language {
  id: number;
  language_name: string;
  language_code: string;
}
