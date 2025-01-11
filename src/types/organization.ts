export interface Organization {
  id: number;
  display_name: string;
  profile_image?: string;
  acronym?: string;
  meta_page?: string;
  mastodon?: string;
  tag_diff?: string;
  home_project?: string;
  update_date?: string;
  type?: number;
  territory?: number[];
  managers?: number[];
  known_capacities?: number[];
  available_capacities?: number[];
  wanted_capacities?: number[];
  projects?: any[];
  events?: any[];
  news?: any[];
  documents?: any[];
  contacts?: any[];
}

export interface OrganizationType {
  id: number;
  name: string;
  description: string;
}
