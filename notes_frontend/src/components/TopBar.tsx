import React from "react";

// PUBLIC_INTERFACE
export default function TopBar({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200" style={{background:'#fff'}}>
      <div className="font-bold text-lg text-[#2563eb] tracking-tight">Notes</div>
      <button
        className="py-2 px-4 rounded-md bg-[#2563eb] text-white font-medium hover:bg-[#2563ebcc] transition-all"
        style={{ boxShadow: "0 1px 2px rgb(37 99 235 / 6%)" }}
        onClick={onAdd}
      >
        + Add Note
      </button>
    </header>
  );
}
