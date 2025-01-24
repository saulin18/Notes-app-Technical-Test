interface CategoryItemProps {
    name: string
  }
  
  export function CategoryItem({ name }: CategoryItemProps) {
    return (
      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mr-2 mb-2">
        {name}
      </span>
    )
  }