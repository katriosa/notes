<template>
  <div
    class="board"
    ref="boardElement"
    :style="{ gridTemplateColumns: `repeat(${numberOfColumns}, 200px)` }"
  >
    <NoteItem v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup lang="ts">
import NoteItem from './NoteItem/NoteItem.vue'
import { useNotesStore } from '../stores/NotesStore'
import { computed, onMounted, ref } from 'vue'

const store = useNotesStore()
const notes = computed(() => store.notes)
const numberOfColumns = computed(() => store.numberOfColumns)
const boardElement = ref<HTMLElement | null>(null)

onMounted(() => {
  if (boardElement.value) {
    const boardRect = boardElement.value.getBoundingClientRect()
    store.getNumberOfColumns(Math.round(boardRect.width))
  }
})
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
  padding-top: 45px;
  padding-bottom: 15px;
  display: grid;
  grid-auto-rows: 200px;
  gap: 30px;
  justify-content: center;
  overflow: hidden;
}
</style>
