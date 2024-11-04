import { User } from "@/domain/entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(userId: string): Promise<void>;
}
