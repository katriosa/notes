<template>
  <div class="board">
    <Note :noteId="1" />
    <Note :noteId="2" />
  </div>
</template>

<script setup lang="ts">
import Note from './NoteItem.vue'
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
