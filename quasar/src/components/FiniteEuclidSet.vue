<template>
  <InfiniteEuclidSet /> <sub>{{ store.selected.l }}</sub>
</template>

<script setup>
import InfiniteEuclidSet from "./InfiniteEuclidSet.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
