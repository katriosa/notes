<template>
  <header>
    <h1>Заметки</h1>
    <div class="new-note-controls">
      <button
        @click="store.addNewNote('pink')"
        class="color-option option-pink"
      ></button>
      <button
        @click="store.addNewNote('yellow')"
        class="color-option option-yellow"
      ></button>
      <button
        @click="store.addNewNote('blue')"
        class="color-option option-blue"
      ></button>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useNotesStore } from './stores/NotesStore'

const store = useNotesStore()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-note-controls {
  background-color: var(--color-board-background);
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
}

.color-option {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-note-pink);
}

.color-option:hover {
  border: 1px solid var(--color-text);
}

.option-pink {
  background-color: var(--color-note-pink);
}

.option-yellow {
  background-color: var(--color-note-yellow);
}

.option-blue {
  background-color: var(--color-note-blue);
}
</style>
