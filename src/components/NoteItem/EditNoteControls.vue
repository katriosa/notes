<template>
  <div class="edit-note-controls">
    <img
      src="/pin-icon.svg"
      alt="Pin"
      class="icon pin-icon"
      @mousedown="togglePin"
    />
    <img
      src="/delete-icon.svg"
      alt="Delete"
      class="icon delete-icon"
      @mousedown="deleteNote"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ isPinned: boolean }>()
const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'toggle-pin'): void
}>()

const deleteNote = () => emit('delete')
const togglePin = () => emit('toggle-pin')
</script>

<style scoped>
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
.icon {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
