import { Category } from "../types-d"
import { CategoryItem } from "./CategoryItem"


interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="flex flex-wrap mt-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} name={category.name} />
      ))}
    </div>
  )
}
