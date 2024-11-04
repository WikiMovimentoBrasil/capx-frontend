import { User } from "@/domain/entities/User";

export interface Session {
  status: SessionStatus;
  user?: User;
}

export enum SessionStatus {
  AUTHENTICATED = "authenticated",
  LOADING = "loading",
  UNAUTHENTICATED = "unauthenticated",
}
