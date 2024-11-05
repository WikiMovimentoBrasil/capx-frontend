export interface UserProfile {
  id: string;
  username: string;
  wiki_alt?: string;
  profile_image?: string;
  territory: string[];
  language: string[];
  affiliation: string[];
  wikimedia_project: string[];
  skills_wanted: string[];
  skills_known: string[];
  skills_available: string[];
  contact?: ContactInfo[];
}

export interface ContactInfo {
  display_name: string;
  value: string;
}

export interface UserProfileData {
  userData: UserProfile;
  territoryData: Territory[];
  languageData: Language[];
  affiliationData: Affiliation[];
  wikiProjectData: WikiProject[];
  skillData: Skill[];
}

export interface Territory {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Affiliation {
  code: string;
  name: string;
}

export interface WikiProject {
  code: string;
  name: string;
}

export interface Skill {
  code: string;
  name: string;
  description?: string;
}
