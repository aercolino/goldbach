<template>
  <q-tooltip
    class="bg-amber text-black shadow-4"
    :style="{ width: freeWidth ? 'inherit' : '200px' }"
  >
    <slot></slot>
  </q-tooltip>
</template>

<script setup>
defineProps({
  freeWidth: { type: Boolean, default: false },
})
</script>
