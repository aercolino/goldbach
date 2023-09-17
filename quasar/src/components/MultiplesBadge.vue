<template>
  <q-badge class="q-ml-md" color="brown-6"
    >{{ EuclidSetsStore.multiples }} multiples
    <q-tooltip
      >Multiples of {{ EuclidSetsStore.selected.m }}, from
      {{ EuclidSetsStore.selected.m * EuclidSetsStore.getSelected[0].at(0) }} to
      {{ EuclidSetsStore.selected.m * EuclidSetsStore.getSelected[0].at(-1) }}.</q-tooltip
    >
  </q-badge>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
