<template>
  <q-badge class="q-ml-md" color="brown-6"
    >{{ EuclidSetsStore.percentage }} % <q-tooltip>failures / multiples</q-tooltip></q-badge
  >
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
