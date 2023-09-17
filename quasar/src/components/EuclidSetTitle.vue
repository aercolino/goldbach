<template>
  <div class="col text-body1">
    EuclidSet({{ EuclidSetsStore.selected.c }},{{ EuclidSetsStore.selected.m }})
    <sub>{{ EuclidSetsStore.selected.l }}</sub>
  </div>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
