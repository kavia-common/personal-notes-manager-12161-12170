import React from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}

// PUBLIC_INTERFACE
export default function NoteView({
  note,
  onEdit,
  onDelete,
}: {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <section className="max-w-2xl mx-auto p-8 flex flex-col h-full">
      {/* Note Toolbar */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          className="rounded px-3 py-1 bg-[#64748b] text-white text-sm hover:bg-[#505a6e] transition"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          className="rounded px-3 py-1 bg-[#f59e42] text-white text-sm hover:bg-[#f58727ef] transition"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#2563eb] mb-3">{note.title}</h2>
        <div className="whitespace-pre-line text-gray-700 text-base">{note.content}</div>
      </div>
      <div className="mt-6 text-xs text-gray-400">
        Last edited: {note.updatedAt instanceof Date ? note.updatedAt.toLocaleString() : note.updatedAt}
      </div>
    </section>
  );
}
