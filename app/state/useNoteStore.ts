import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteState {
  notes: Record<number, string[]>;
  addNote: (pokemonId: number, note: string) => void;
  removeNote: (pokemonId: number, noteIndex: number) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: {},
      addNote: (pokemonId, note) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [pokemonId]: [...(state.notes[pokemonId] || []), note],
          },
        })),
      removeNote: (pokemonId, noteIndex) =>
        set((state) => {
          const newNotes = [...(state.notes[pokemonId] || [])];
          newNotes.splice(noteIndex, 1);
          return {
            notes: {
              ...state.notes,
              [pokemonId]: newNotes,
            },
          };
        }),
    }),
    {
      name: "notes-storage",
    },
  ),
);
