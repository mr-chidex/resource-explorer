"use client";

import { useState } from "react";

interface NoteFormProps {
  onAddNote: (note: string) => void;
}

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() === "") {
      setError("Note cannot be empty.");
      return;
    }
    setError("");
    onAddNote(note);
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3 className="text-xl font-semibold dark:text-white">Add a Note</h3>
      <textarea
        className="w-full p-2 mt-2 border border-gray-300 resize-none rounded-md outline-none dark:bg-gray-700 dark:text-white"
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="e.g., 'This Pokémon is great for gym battles.'"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  );
}
