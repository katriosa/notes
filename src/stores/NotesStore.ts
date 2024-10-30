import { defineStore } from 'pinia'
import type { Note } from '../types/Note'
import { ref, watch } from 'vue'
import { NOTE_PADDING, NOTE_WIDTH } from './constants'

export const useNotesStore = defineStore('boardStore', () => {
  const notes = ref<Note[]>([])
  const numberOfColumns = ref(1)

  const getNumberOfColumns = (width: number) => {
    const maxColumns = Math.floor(
      (width + NOTE_PADDING) / (NOTE_WIDTH + NOTE_PADDING),
    )
    numberOfColumns.value = Math.max(1, maxColumns)
  }

  const notesFromLocalStorage = localStorage.getItem('notes')
  if (notesFromLocalStorage) {
    notes.value = JSON.parse(notesFromLocalStorage)
  }

  const handleNotePosition = () => {
    let column = 1
    let row = 1

    if (notes.value.length > 0) {
      const lastNote = notes.value[notes.value.length - 1]
      column = lastNote.positionInGrid.column + 1
      row = lastNote.positionInGrid.row

      if (column > numberOfColumns.value) {
        column = 1
        row += 1
      }
    }
    return { column, row }
  }

  const addNewNote = (bg: string) => {
    const { column, row } = handleNotePosition()
    const newNote = {
      id: Date.now(),
      text: '',
      background: bg,
      position: { x: 0, y: 0 },
      isPinned: false,
      positionInGrid: { column, row },
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

  return {
    notes,
    addNewNote,
    updateNote,
    deleteNote,
    moveNote,
    getNumberOfColumns,
    numberOfColumns,
  }
})
