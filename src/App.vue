<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Заметки</h1>
    <div class="new-note-controls">
      <div class="note-color-picker">
        <div class="color-option option-1"></div>
        <div class="color-option option-2"></div>
        <div class="color-option option-3"></div>
      </div>
      <!-- <button>Создать</button> -->
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
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
}

.note-color-picker {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.color-option {
  width: 2rem;
  height: 2rem;
  background-color: var(--color-note-bg-1);
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

/* button {
  border: none;
  background-color: var(--color-background);
  color: var(--color-note-text);
  cursor: pointer;
  padding: 0 1rem;
} */
</style>
