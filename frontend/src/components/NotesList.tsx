import { Note } from "../types/types-d";
import { NoteCard } from "./NoteCard";


interface NotesListProps {
  notes: Note[];
}

export const NoteList = ({ notes }: NotesListProps) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No notes found with the selected filters
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          isArchived={note.is_archived}
          categories={note.categories}
        />
      ))}
    </div>
  );
};