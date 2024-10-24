<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Заметки</h1>
    <div class="new-note-controls">
      <button class="color-option option-1"></button>
      <button class="color-option option-2"></button>
      <button class="color-option option-3"></button>
    </div>
  </header>

  <RouterView />
</template>

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
  background-color: var(--color-note-bg-1);
}

.color-option:hover {
  border: 1px solid var(--color-text);
}

.option-1 {
  background-color: var(--color-note-bg-1);
}

.option-2 {
  background-color: var(--color-note-bg-2);
}

.option-3 {
  background-color: var(--color-note-bg-3);
}
</style>
