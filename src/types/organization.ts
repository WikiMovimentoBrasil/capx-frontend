export interface Organization {
  id: number;
  display_name?: string;
  profile_image?: string;
  acronym?: string;
  meta_page?: string;
  home_project?: string;
  updated_date?: string;
  type?: number;
  territory?: string[];
  managers?: string[];
}

export interface OrganizationType {
  id: number;
  name: string;
  description: string;
}
