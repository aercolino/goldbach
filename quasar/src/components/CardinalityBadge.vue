<template>
  <q-badge color="blue-grey-4"
    >{{ set?.length }} {{ label }}
    <q-tooltip>
      <slot></slot>
    </q-tooltip>
  </q-badge>
</template>

<script setup>
const props = defineProps({
  set: { type: Array, required: true },
  label: { type: String, default: "elements" }
})
</script>
