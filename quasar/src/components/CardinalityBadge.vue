<template>
  <q-badge color="blue-grey-4">{{ count }} {{ label }}</q-badge>
</template>

<script setup>
const props = defineProps({
  count: { type: Number, default: 0 },
  label: { type: String, default: "elements" }
})
</script>
