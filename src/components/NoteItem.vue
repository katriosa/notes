<template>
  <textarea
    v-model="noteText"
    @blur="saveNote"
    class="note-text"
    spellcheck="false"
    :style="{ backgroundColor: `var(--color-note-${props.background})` }"
  ></textarea>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotesStore } from '../stores/NotesStore'
import type { Note } from '../types/Note'

const store = useNotesStore()
const noteText = ref<string>('')

const props = defineProps<Note>()

const saveNote = () => {
  store.updateNote(props.id, noteText.value)
}

onMounted(() => {
  noteText.value = props.text
})
</script>

<style scoped>
textarea.note-text {
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
