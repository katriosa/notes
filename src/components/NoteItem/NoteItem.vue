<template>
  <div
    class="note-container"
    ref="noteElement"
    :style="{
      left: `${note.position.x}px`,
      top: `${note.position.y}px`,
      gridColumn: note.positionInGrid.column,
      gridRow: note.positionInGrid.row,
    }"
    @mousedown="startDragging"
  >
    <EditNoteControls
      v-if="isEditMode"
      :isPinned="note.isPinned"
      @delete="store.deleteNote(note.id)"
      @toggle-pin="togglePin"
    />
    <PinnedIndicator v-if="note.isPinned" />
    <NoteText
      :text="noteText"
      :background="note.background"
      :isDragging="isDragging"
      @save="saveNote"
      @edit="editNote"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNotesStore } from '../../stores/NotesStore'
import type { Note } from '../../types/Note'

import EditNoteControls from './EditNoteControls.vue'
import PinnedIndicator from './PinnedIndicator.vue'
import NoteText from './NoteText.vue'

const props = defineProps<{ note: Note }>()
const note = props.note

const store = useNotesStore()
const noteText = ref(note.text)
const isEditMode = ref(false)
const firstClickAfterSave = ref<boolean>(true)
const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })
const noteElement = ref<HTMLElement | null>(null)

const startDragging = (event: MouseEvent) => {
  if (note.isPinned) return
  isDragging.value = true
  offset.value = {
    x: event.clientX - note.position.x,
    y: event.clientY - note.position.y,
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDragging)
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return
  store.moveNote(
    note.id,
    event.clientX - offset.value.x,
    event.clientY - offset.value.y,
  )
}

const stopDragging = () => {
  if (isDragging.value) {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDragging)
  }
}

onUnmounted(stopDragging)

const saveNote = (text: string) => {
  if (note.text !== text) {
    store.updateNote(note.id, noteText.value)
  }
  firstClickAfterSave.value = true
  isEditMode.value = false
}

const editNote = (event: FocusEvent) => {
  isEditMode.value = true

  if (firstClickAfterSave.value) {
    const textarea = event.target as HTMLTextAreaElement
    textarea.setSelectionRange(0, 0)
  }
  firstClickAfterSave.value = false
}

const togglePin = () => {
  note.isPinned = !note.isPinned
}

onMounted(() => {
  noteText.value = note.text
})
</script>

<style scoped>
.note-container {
  position: relative;
  width: 200px;
  height: 200px;
}
</style>
