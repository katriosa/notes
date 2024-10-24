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
    }
    notes.value.push(newNote)
    return newNote
  }

  const updateNote = (id: number, text: string) => {
    const currentNote = notes.value.find(note => note.id === id)
    if (currentNote) {
      currentNote.text = text
    }
  }

  // watch(notes.value, newValue => {
  //   console.log('store notes:', newValue)
  // })

  watch(
    () => notes.value,
    state => {
      localStorage.setItem('notes', JSON.stringify(state))
    },
    { deep: true },
  )

  return { notes, addNewNote, updateNote }
})
