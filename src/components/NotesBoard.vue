<template>
  <div class="board">
    <Note
      v-for="note in store.notes"
      :key="note.id"
      :id="note.id"
      :background="note.background"
      text="note.text"
    />
  </div>
</template>

<script setup lang="ts">
import Note from './NoteItem.vue'
import { useNotesStore } from '../stores/NotesStore'

const store = useNotesStore()
</script>

<style scoped>
.board {
  flex-grow: 1;
  background-image: radial-gradient(
    var(--color-background) 20%,
    var(--color-board-background) 20%
  );
  background-position: 5px 5px;
  background-size: 15px 15px;
  border-radius: 10px;
  padding: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
