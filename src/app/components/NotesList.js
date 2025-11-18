"use client";
import Image from "next/image";
import { useState } from "react";

export default function NotesList({ notes }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");

  async function saveEdit() {
    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, title: editTitle, text: editText }),

    });

    setEditId(null);
    setEditText("");
    window.location.reload();
  }

  return (
    <div className="mt-6 space-y-4">
      {notes.map((n) => (
        <div
          key={n._id}
          className="p-3 border rounded bg-white dark:bg-gray-800"
        >
          {editId === n._id ? (
            <>
              <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Edit Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                className="w-full border p-2 rounded"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              ></textarea>
                
              <button onClick={saveEdit}>
                <Image src="/save.svg" alt="save" width={22} height={22} />
              </button>
              <button onClick={() => setEditId(null)}>
                <Image src="/cancel.svg" alt="cancel" width={22} height={22} />
              </button>
            
            </>
          ) : (
            <>
              <h1 className="font-bold text-2xl text-green-600">{n.title}</h1>
              <p className="mt-1 text-sm">{n.text}</p>

              <div className="flex justify-between mt-2">
                <small className="text-gray-500 dark:text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </small>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(n._id);
                      setEditTitle(n.title);
                      setEditText(n.text);
                    }}
                  >
                    <Image src="/edit.svg" alt="edit" width={22} height={22} />
                  </button>

                  <button
                    onClick={async () => {
                      await fetch("/api/notes", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: n._id }),
                      });
                      window.location.reload();
                    }}
                  >
                    <Image
                      src="/Delete.svg"
                      alt="Delete"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
