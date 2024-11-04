import { UserProfile } from "@/domain/entities/User";

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  users: UserProfile[];
}

export enum TagCategory {
  TERRITORY = "territory",
  LANGUAGE = "language",
  AFFILIATION = "affiliation",
  WIKIMEDIA_PROJECT = "wikimedia_project",
}
