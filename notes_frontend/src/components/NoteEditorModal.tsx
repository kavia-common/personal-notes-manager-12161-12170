import React, { useEffect, useRef, useState } from "react";

interface NoteInput {
  id?: number;
  title: string;
  content: string;
}

// PUBLIC_INTERFACE
export default function NoteEditorModal({
  open,
  onSave,
  onClose,
  initialNote,
}: {
  open: boolean;
  onSave: (note: NoteInput) => void;
  onClose: () => void;
  initialNote: NoteInput | null;
}) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [showError, setShowError] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle(initialNote?.title ?? "");
    setContent(initialNote?.content ?? "");
    setShowError(false);
    if (open && titleRef.current) {
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [open, initialNote]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setShowError(true);
      return;
    }
    onSave({ ...(initialNote ?? {}), title, content });
    setTitle("");
    setContent("");
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h3 className="text-lg font-bold text-[#2563eb] mb-2">{initialNote?.id ? "Edit Note" : "New Note"}</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
          <input
            className="border border-gray-200 rounded px-3 py-2 text-base focus:border-[#2563eb] focus:outline-none"
            type="text"
            placeholder="Title"
            maxLength={50}
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note Title"
          />
          {showError && <span className="text-xs text-[#f59e42]">Title is required</span>}
          <textarea
            className="border border-gray-200 rounded px-3 py-2 text-base resize-none min-h-[120px] focus:border-[#2563eb] focus:outline-none"
            placeholder="Content"
            value={content}
            maxLength={1000}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Note Content"
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="py-1 px-3 rounded border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-1 px-5 rounded bg-[#2563eb] text-white font-medium hover:bg-[#2563ebcc] transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
