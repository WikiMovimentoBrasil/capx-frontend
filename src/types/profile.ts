export interface Profile {
  name: string;
  about: string;
  affiliation: string;
  contact?: string;
  display_name?: string;
  language: string[];
  profile_image?: string;
  pronoun?: string;
  skills_available: string[];
  skills_known: string[];
  skills_wanted: string[];
  social?: string[];
  team?: string;
  territory?: string;
  user: {
    data: {
      id: string;
      username: string;
      email: string;
      is_active: boolean;
      is_staff: boolean;
      last_login: string;
      date_joined: string;
    };
  };
  wiki_alt?: string;
  wikidata_qid?: string;
  wikimedia_project?: string[];
}
