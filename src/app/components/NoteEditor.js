"use client";

import { useEffect, useState } from "react";

export default function NoteEditor() {
  const [title, setTitle] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("draftTitle") || "";
    }
    return "";
  });

  const [text, setText] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("draftNote") || "";
    }
    return "";
  });

  useEffect(() => {
    localStorage.setItem("draftTitle", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("draftNote", text);
  }, [text]);

  async function saveNote() {
    if (!title.trim()) return alert("Title is empty!");
    if (!text.trim()) return alert("Note is empty!");

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, text }),
    });

    localStorage.removeItem("draftTitle");
    localStorage.removeItem("draftNote");

    setTitle("");
    setText("");

    window.location.reload();
  }

  return (
    <div className="space-y-3">
      {/* NEW: Note Title */}
      <div>
        Enter title
        <input
          type="text"
          className="w-full p-3 border rounded"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        Enter Note
        <textarea
          className="w-full p-3 border rounded"
          rows="4"
          placeholder="Write your note"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={saveNote}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Note
      </button>
    </div>
  );
}
