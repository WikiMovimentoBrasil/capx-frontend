interface Contact {
  display_name: string;
  value: string;
}

interface Social {
  display_name: string;
  value: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  last_login: string;
}

export interface UserProfile {
  user: UserData;
  profile_image: string;
  display_name: string;
  pronoun: string;
  about: string;
  wikidata_qid: string;
  wiki_alt: string;
  territory: number[];
  language: number[];
  affiliation: number[];
  wikimedia_project: number[];
  team: string;
  skills_known: string[];
  skills_available: string[];
  skills_wanted: string[];
  contact: Contact[];
  social: Social[];
  is_manager: number[];
}
