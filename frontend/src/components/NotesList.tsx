import { Note } from "../types-d";
import { NoteCard } from "./NoteCard";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          content={note.content}
          isArchived={note.is_archived}
          categories={note.categories}
          id={note.id}
        />
      ))}
    </div>
  );
}
