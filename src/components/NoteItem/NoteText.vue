<template>
  <textarea
    v-model="text"
    @blur="onBlur"
    @click="openEditMode"
    class="note-text"
    spellcheck="false"
    :style="{
      backgroundColor: `var(--color-note-${background})`,
      cursor: isDragging ? 'move' : 'auto',
      caretColor: isDragging ? 'transparent' : 'black',
    }"
  ></textarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  text: string
  background: string
  isDragging: boolean
}>()
const emit = defineEmits<{
  (e: 'save', text: string): void
  (e: 'edit', event: FocusEvent): void
}>()

const text = ref(props.text)

const onBlur = () => emit('save', text.value)
const openEditMode = (event: FocusEvent) => emit('edit', event)
</script>

<style scoped>
.note-text {
  padding: 1rem;
  width: 100%;
  height: 100%;
  font-size: 12px;
  border: none;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  outline: none;
}
</style>
