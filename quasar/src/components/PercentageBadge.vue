<template>
  <q-badge class="q-ml-md" color="brown-6" title="failures / multiples"
    >{{ EuclidSetsStore.percentage }} %</q-badge
  >
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
