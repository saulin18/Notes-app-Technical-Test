interface CategoryItemProps {
  name: string;
  id: number; // Quita el "?" para hacerlo obligatorio
  isSelected?: boolean;
  onClick?: (categoryId: number) => void;
}

export function CategoryItem({
  name,
  id,
  isSelected = false,
  onClick
}: CategoryItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(id)} 
      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
        isSelected 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
      }`}
    >
      {name}
    </button>
  );
}