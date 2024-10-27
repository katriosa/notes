<template>
  <div
    class="note-container"
    :style="{ left: `${note.position.x}px`, top: `${note.position.y}px` }"
    @mousedown="startDragging"
  >
    <div
      v-if="isEditMode"
      @mousedown="isClickOnNoteControls = true"
      @click="handleClickOnNoteControls"
      class="edit-note-controls"
    >
      <img src="/pin-icon.svg" alt="Pin" class="icon pin-icon" />
      <img src="/delete-icon.svg" alt="Delete" class="icon delete-icon" />
    </div>
    <div v-if="note.isPinned" class="pinned-indicator"></div>
    <textarea
      v-model="noteText"
      @blur="onBlur"
      @click="openEditMode"
      class="note-text"
      spellcheck="false"
      :style="{
        backgroundColor: `var(--color-note-${note.background})`,
        cursor: isDragging ? 'move' : 'auto',
        caretColor: isDragging ? 'transparent' : 'black',
      }"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useNotesStore } from '../stores/NotesStore'
import type { Note } from '../types/Note'

const props = defineProps<{ note: Note }>()
const note = props.note

const store = useNotesStore()
const noteText = ref<string>('')
const isEditMode = ref<boolean>(false)
const firstClickAfterSave = ref<boolean>(true)
const isClickOnNoteControls = ref<boolean>(false)

const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })

const startDragging = (event: MouseEvent) => {
  if (note.isPinned) return
  isDragging.value = true

  offset.value.x = event.clientX - note.position.x
  offset.value.y = event.clientY - note.position.y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDragging)
}

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  const newX = event.clientX - offset.value.x
  const newY = event.clientY - offset.value.y

  store.moveNote(note.id, newX, newY)
}

const stopDragging = () => {
  if (isDragging.value) {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDragging)
  }
}

onUnmounted(stopDragging)

const saveNote = () => {
  if (note.text !== noteText.value) {
    store.updateNote(note.id, noteText.value)
  }
  firstClickAfterSave.value = true
  isEditMode.value = false
}

const onBlur = () => {
  if (!isClickOnNoteControls.value) {
    saveNote()
  } else {
    isClickOnNoteControls.value = false
  }
}
const openEditMode = (event: FocusEvent) => {
  isEditMode.value = true

  if (firstClickAfterSave.value) {
    const textarea = event.target as HTMLTextAreaElement
    textarea.setSelectionRange(0, 0)
  }
  firstClickAfterSave.value = false
}

const handleClickOnNoteControls = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.closest('.delete-icon')) {
    store.deleteNote(note.id)
  }
  if (target.closest('.pin-icon')) {
    note.isPinned = !note.isPinned
  }
  isEditMode.value = false
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

.note-text {
  padding: 1rem;
  width: 100%;
  height: 100%;
  font-size: 12px;
  border: none;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  outline: none;
}

.edit-note-controls {
  background-color: var(--color-text);
  display: flex;
  border-radius: 10px;
  align-items: center;
  position: absolute;
  padding: 0.5rem;
  gap: 1rem;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.pinned-indicator {
  background-color: var(--color-pin);
  border: 4px solid var(--color-pin-border);
  width: 120px;
  height: 30px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  box-sizing: border-box;
}

.icon {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
