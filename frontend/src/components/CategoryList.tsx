import { Category } from "../types-d";
import { CategoryItem } from "./CategoryItem";

interface CategoryListProps {
  categories: Category[];
  onRemove?: (categoryId: number) => void;
}

export function CategoryList({ categories, onRemove }: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id} 
          name={category.name}
          onClick={onRemove} 
        />
      ))}
    </div>
  );
}