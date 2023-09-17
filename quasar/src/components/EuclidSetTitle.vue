<template>
  <div class="col text-body1">
    EuclidSet({{ store.selected.c }},{{ store.selected.m }})
    <sub>{{ store.selected.l }}</sub>
  </div>
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
