import { Category } from "../types-d";
import { CategoryList } from "./CategoryList";

interface NoteCardProps {
  title: string;
  content: string;
  isArchived: boolean;
  categories: Category[];
}

export function NoteCard({
  title,
  content,
  isArchived,
  categories,
}: NoteCardProps) {
  return (
    <div
      className={`
        w-full rounded-lg shadow-lg p-6
        ${isArchived ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}
        transition-all duration-200 hover:shadow-xl
      `}
    >
      <div className="relative mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {isArchived && (
          <span className="absolute -top-1 right-0 bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
            Archived
          </span>
        )}
      </div>
      <p
        className={`
        ${isArchived ? "text-gray-300" : "text-gray-600"}
        text-sm line-clamp-3 mb-2
      `}
      >
        {content}
      </p>
      <CategoryList categories={categories} />
    </div>
  );
}
