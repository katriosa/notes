<template>
  <textarea
    v-model="noteText"
    @blur="saveNote"
    class="note-text"
    spellcheck="false"
  ></textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotesStore } from '../stores/NotesStore'

const store = useNotesStore()
const noteText = ref<string>('')

const props = defineProps<{
  noteId: number
}>()

// watch(noteText, newValue => {
//   console.log('noteText changed:', newValue)
// })

const saveNote = () => {
  const newNote = {
    id: props.noteId,
    text: noteText.value,
  }
  store.addNote(newNote)
}
</script>

<style scoped>
textarea.note-text {
  background-color: var(--color-note-bg-1);
  padding: 0.6rem;
  width: 200px;
  height: 200px;
  font-size: 14px;
  border: none;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  outline: none;
}
</style>
