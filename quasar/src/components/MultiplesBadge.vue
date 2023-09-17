<template>
  <q-badge class="q-ml-md" color="brown-6"
    >{{ store.multiples }} multiples
    <q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px"
      >Biggest number of multiples of {{ store.selected.m }} that can be written as the sum of
      {{ store.selected.m }} numbers of the current EuclidSet, from
      {{ store.selected.m * store.getSelected[0].at(0) }} to
      {{ store.selected.m * store.getSelected[0].at(-1) }}.</q-tooltip
    >
  </q-badge>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
