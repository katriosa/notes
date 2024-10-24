<template>
  <div class="note-container">
    <div v-if="isEditMode" class="edit-note-controls">
      <img src="../../public/pin-icon.svg" alt="Pin" class="icon" />
      <img src="../../public/delete-icon.svg" alt="Delete" class="icon" />
    </div>
    <textarea
      v-model="noteText"
      @blur="saveNote"
      @click="openEditMode"
      class="note-text"
      spellcheck="false"
      :style="{ backgroundColor: `var(--color-note-${props.background})` }"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotesStore } from '../stores/NotesStore'
import type { Note } from '../types/Note'

const props = defineProps<Note>()

const store = useNotesStore()
const noteText = ref<string>('')
const isEditMode = ref<boolean>(false)
const firstClickAfterSave = ref<boolean>(true)

const saveNote = () => {
  store.updateNote(props.id, noteText.value)
  isEditMode.value = false
  firstClickAfterSave.value = true
}

const openEditMode = (event: FocusEvent) => {
  isEditMode.value = true

  if (firstClickAfterSave.value) {
    const textarea = event.target as HTMLTextAreaElement
    textarea.setSelectionRange(0, 0)
  }
  firstClickAfterSave.value = false
}

onMounted(() => {
  noteText.value = props.text
})
</script>

<style scoped>
.note-container {
  position: relative;
  width: 200px;
  height: 200px;
}

textarea.note-text {
  padding: 0.6rem;
  width: 100%;
  height: 100%;
  font-size: 14px;
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
}

.icon {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
