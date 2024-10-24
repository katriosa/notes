import { defineStore } from 'pinia'
import type { Note } from '../types/Note'
import { ref } from 'vue'

export const useNotesStore = defineStore('boardStore', () => {
  const notes = ref<Note[]>([])

  // const notesFromLocalStorage = localStorage.getItem('notes')
  // if (notesFromLocalStorage) {
  //   notes.value = JSON.parse(notesFromLocalStorage)
  //   // console.log(JSON.parse(notesFromLocalStorage))
  // }

  // const addNote = (note: Note): void => {
  //   notes.value.push(note)
  // }

  const addNewNote = (bg: string) => {
    const newNote = {
      id: Date.now(),
      text: '',
      background: bg,
    }
    notes.value.push(newNote)
    return newNote
  }

  // watch(
  //   () => notes.value,
  //   state => {
  //     localStorage.setItem('notes', JSON.stringify(state))
  //   },
  //   { deep: true },
  // )

  return { notes, addNewNote }
})
