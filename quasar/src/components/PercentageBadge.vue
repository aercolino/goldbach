<template>
  <q-badge class="q-ml-md" color="brown-6"
    >{{ store.percentage }} % <q-tooltip>failures / multiples</q-tooltip></q-badge
  >
</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
