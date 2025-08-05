import React from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: {
  notes: Note[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <nav className="divide-y divide-gray-100">
      {notes.length === 0 ? (
        <div className="p-4 text-sm text-gray-400">No notes yet.</div>
      ) : (
        notes.map((n) => (
          <div
            key={n.id}
            className={`flex group justify-between items-start px-4 py-3 cursor-pointer bg-white hover:bg-[#f4f5f7] transition-colors ${
              n.id === selectedId ? "bg-[#eaf1fe] border-l-4 border-[#2563eb]" : ""
            }`}
            onClick={() => onSelect(n.id)}
            tabIndex={0}
            aria-label={`Select note "${n.title}"`}
          >
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-gray-900 text-base">
                {n.title}
              </div>
              <div className="truncate text-xs text-gray-500 mt-1">
                {n.content.slice(0, 48) + (n.content.length > 48 ? "..." : "")}
              </div>
              <div className="text-[10px] text-gray-300 mt-1">{n.updatedAt instanceof Date ? n.updatedAt.toLocaleString() : n.updatedAt}</div>
            </div>
            <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="rounded p-1 hover:bg-[#64748b11] focus:outline-none"
                tabIndex={-1}
                aria-label="Edit note"
                onClick={e => {
                  e.stopPropagation(); onEdit(n);
                }}
              >
                <EditIcon />
              </button>
              <button
                className="rounded p-1 hover:bg-[#f59e4222] focus:outline-none"
                tabIndex={-1}
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation(); onDelete(n.id);
                }}
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))
      )}
    </nav>
  );
}

function EditIcon() {
  return (
    // Pencil icon, secondary color
    <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth={2} viewBox="0 0 20 20">
      <path d="M13.586 3.586a2 2 0 012.828 2.828L8.828 14H6v-2.828l9.586-9.586z" />
    </svg>
  );
}

function TrashIcon() {
  // Accent color
  return (
    <svg width="18" height="18" fill="none" stroke="#f59e42" strokeWidth={2} viewBox="0 0 20 20">
      <path d="M6 7v7a2 2 0 002 2h4a2 2 0 002-2V7" />
      <path d="M9 10v3M11 10v3M4 7h12M5 4h10v2H5V4z" />
    </svg>
  );
}
