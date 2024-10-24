import { defineStore } from 'pinia'
import type { Note } from '../types/Note'
import { ref, watch } from 'vue'

export const useNotesStore = defineStore('boardStore', () => {
  const notes = ref<Note[]>([])

  const notesFromLocalStorage = localStorage.getItem('notes')
  if (notesFromLocalStorage) {
    notes.value = JSON.parse(notesFromLocalStorage)
    // console.log(JSON.parse(notesFromLocalStorage))
  }

  const addNote = (note: Note): void => {
    notes.value.push(note)
  }

  watch(
    () => notes.value,
    state => {
      localStorage.setItem('notes', JSON.stringify(state))
    },
    { deep: true },
  )

  return { notes, addNote }
})
