<template>
  <CardinalityBadge :set="FailuresSet" label="failures">
    Multiples of {{ store.selected.m }} that cannot be written as the sum of
    {{ store.selected.m }} numbers of the current EuclidSet.
  </CardinalityBadge>
</template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const FailuresSet = computed(() => store.getSelected[1])
</script>
