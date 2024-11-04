import { Session } from "@/domain/entities/Session";

export interface IAuthenticationService {
  getCurrentSession(): Promise<Session>;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}
