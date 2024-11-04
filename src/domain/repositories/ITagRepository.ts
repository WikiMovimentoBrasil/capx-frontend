import { Tag, TagCategory } from "@/domain/entities/Tags";

export interface ITagRepository {
  findById(id: string, category: TagCategory): Promise<Tag | null>;
  findByCategory(category: TagCategory): Promise<Tag[]>;
}
