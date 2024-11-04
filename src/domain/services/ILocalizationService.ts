export interface ILocalizationService {
  getCurrentLanguage(): string;
  setLanguage(language: string): void;
  translate(key: string): string;
}
