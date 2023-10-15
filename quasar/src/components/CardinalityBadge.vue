<template>
  <q-badge color="blue-grey-4"
    >{{ set?.length }} {{ label }}
    <q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px">
      <slot></slot>
    </q-tooltip>
  </q-badge>
</template>

<script setup>
defineProps({
  set: { type: Array, required: true },
  label: { type: String, default: "elements" },
})
</script>
