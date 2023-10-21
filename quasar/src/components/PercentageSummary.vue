<template>
  <BaseSummary> failures / multiples = {{ store.percentage }} % </BaseSummary>
</template>

<script setup>
import BaseSummary from "./BaseSummary.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
