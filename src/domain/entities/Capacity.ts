import { UserProfile } from "@/domain/entities/User";

export interface Capacity {
  code: string;
  name: string;
  users: CapacityUsers;
}

export interface CapacityUsers {
  wanted: UserProfile[];
  known: UserProfile[];
  available: UserProfile[];
}
