export interface Project {
  id: number;
  organizations: number[];
  display_name: string;
  profile_image: string;
  description: string;
  url: string;
  creation_date: string;
  creator: number;
  related_skills: number[];
}
