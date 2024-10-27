<template>
  <div class="board">
    <NoteItem v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup lang="ts">
import NoteItem from './NoteItem.vue'
import { useNotesStore } from '../stores/NotesStore'
import { computed } from 'vue'

const store = useNotesStore()
const notes = computed(() => store.notes)
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
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  overflow: hidden;
}
</style>
