"use client";

import { useState } from "react";
import NotesList from "@/components/NotesList";
import NoteView from "@/components/NoteView";
import TopBar from "@/components/TopBar";
import NoteEditorModal from "@/components/NoteEditorModal";

// Note type for notes app
type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
};
type NoteInput = Omit<Note, "id" | "updatedAt"> & Partial<Pick<Note, "id">>;

// Fake initial notes for prototyping/frontend (replace after backend integration)
const initialNotes: Note[] = [
  { id: 1, title: "Welcome to NotesApp", content: "Select or add a note.", updatedAt: new Date() },
  { id: 2, title: "Try Edit & Delete", content: "You can edit or delete notes.", updatedAt: new Date() },
];

// PUBLIC_INTERFACE
export default function Home() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedId, setSelectedId] = useState<number | null>(notes[0]?.id || null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<NoteInput | null>(null);

  // PUBLIC_INTERFACE
  function handleAdd() {
    setEditNote(null);
    setModalOpen(true);
  }

  // PUBLIC_INTERFACE
  function handleSave(note: NoteInput) {
    if (note.id) {
      // Edit
      setNotes(notes.map(n => n.id === note.id ? { ...n, ...note, updatedAt: new Date() } : n));
      setSelectedId(note.id);
    } else {
      // Create
      const id = Math.max(0, ...notes.map((n) => n.id)) + 1;
      setNotes([{ id, title: note.title, content: note.content, updatedAt: new Date() }, ...notes]);
      setSelectedId(id);
    }
    setModalOpen(false);
  }

  // PUBLIC_INTERFACE
  function handleDelete(id: number) {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedId === id) setSelectedId(notes[0]?.id ?? null);
  }

  // PUBLIC_INTERFACE
  function handleEdit(note: Note) {
    setEditNote({ id: note.id, title: note.title, content: note.content });
    setModalOpen(true);
  }

  // PUBLIC_INTERFACE
  function handleSelect(id: number) {
    setSelectedId(id);
  }

  const selectedNote = notes.find(n => n.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar onAdd={handleAdd} />
      <div className="flex flex-1 overflow-hidden">
        {/* Notes List Panel */}
        <div className="w-full max-w-xs border-r border-gray-200 bg-[#f9fafb] h-full overflow-y-auto">
          <NotesList
            notes={notes}
            onSelect={handleSelect}
            selectedId={selectedId}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
        {/* Main Area */}
        <main className="flex-1 h-full overflow-y-auto">
          {selectedNote ? (
            <NoteView note={selectedNote} onEdit={handleEdit} onDelete={handleDelete} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No note selected.
            </div>
          )}
        </main>
      </div>
      <NoteEditorModal
        open={modalOpen}
        initialNote={editNote}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
