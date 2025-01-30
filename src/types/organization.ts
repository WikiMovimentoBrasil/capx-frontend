import { OrganizationDocument } from "./document";
export interface Organization {
  id: number;
  display_name: string;
  profile_image?: string;
  acronym?: string;
  tag_diff?: any[];
  projects?: number[];
  home_project?: string;
  update_date?: string;
  type?: number;
  territory?: number[];
  managers?: number[];
  known_capacities?: number[];
  available_capacities?: number[];
  wanted_capacities?: number[];
  events?: number[];
  documents?: OrganizationDocument[];
  email?: string;
  website?: string;
  mastodon?: string;
  meta_page?: string;
}

export interface OrganizationType {
  id: number;
  name: string;
  description: string;
}
