<template>
  <BaseSummary>
    {{ FailuresSet.length }} failures / {{ store.multiples }} multiples = {{ store.percentage }} %
  </BaseSummary>
</template>

<script setup>
import BaseSummary from "./BaseSummary.vue"
import { computed } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const FailuresSet = computed(() => store.getSelected[1])
</script>
