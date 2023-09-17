<template>
  <q-badge class="q-ml-md" color="brown-6"
    >{{ store.multiples }} multiples
    <q-tooltip
      >Multiples of {{ store.selected.m }}, from
      {{ store.selected.m * store.getSelected[0].at(0) }} to
      {{ store.selected.m * store.getSelected[0].at(-1) }}.</q-tooltip
    >
  </q-badge>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
