<template>
  <div class="pinned-indicator"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.pinned-indicator {
  background-color: var(--color-pin);
  border: 4px solid var(--color-pin-border);
  width: 120px;
  height: 30px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  box-sizing: border-box;
}
</style>
