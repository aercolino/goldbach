<template>
  <span
    >EuclidSet({{ EuclidSetsStore.selected.c }}, {{ EuclidSetsStore.selected.m }})<sub>{{
      EuclidSetsStore.selected.l
    }}</sub></span
  >
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
