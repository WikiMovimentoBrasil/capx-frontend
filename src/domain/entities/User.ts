export interface User {
  id: string;
  username: string;
  token: string;
  profile: UserProfile;
}

export interface UserProfile {
  profileImage?: string;
  pronoun?: string;
  about?: string;
  wikidataQid?: string;
  wikiAlt?: string;
  territory: string[];
  language: string[];
  affiliation: string[];
  team: string[];
  wikimediaProject: string[];
  skillsWanted: string[];
  skillsKnown: string[];
  skillsAvailable: string[];
  contact: ContactInfo[];
}

export interface ContactInfo {
  displayName: string;
  value: string;
}
