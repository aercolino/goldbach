<template>
  <q-badge color="blue-grey-4">{{ count }} numbers</q-badge>
</template>

<script setup>
const props = defineProps({ count: { type: Number, default: 0 } })
</script>
