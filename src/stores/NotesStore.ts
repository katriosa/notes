import { defineStore } from 'pinia'
import type { Note } from '../types/Note'
import { ref } from 'vue'
import { watch } from 'vue'

export const useNotesStore = defineStore('boardStore', () => {
  const notes = ref<Note[]>([])

  const notesFromLocalStorage = localStorage.getItem('notes')
  if (notesFromLocalStorage) {
    notes.value = JSON.parse(notesFromLocalStorage)
  }

  const addNewNote = (bg: string) => {
    const newNote = {
      id: Date.now(),
      text: '',
      background: bg,
      position: { x: 0, y: 0 },
      isPinned: false,
    }
    notes.value.push(newNote)
  }

  const moveNote = (id: number, x: number, y: number) => {
    const note = notes.value.find(note => note.id === id)
    if (note) {
      note.position.x = x
      note.position.y = y
    }
  }

  const updateNote = (id: number, text: string) => {
    const currentNote = notes.value.find(note => note.id === id)
    if (currentNote) {
      currentNote.text = text
    }
  }

  const deleteNote = (id: number) => {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  watch(
    () => notes.value,
    state => {
      localStorage.setItem('notes', JSON.stringify(state))
    },
    { deep: true },
  )

  return { notes, addNewNote, updateNote, deleteNote, moveNote }
})
