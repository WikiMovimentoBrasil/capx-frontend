import { Capacity } from "@/domain/entities/Capacity";

export interface ICapacityRepository {
  findByCode(code: string): Promise<Capacity | null>;
  findAll(): Promise<Capacity[]>;
}
