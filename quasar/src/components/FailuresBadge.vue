<template>
  <CardinalityBadge :set="FailuresSet">
    Multiples of {{ EuclidSetsStore.selected.m }} which cannot be written as the sum of
    {{ EuclidSetsStore.selected.m }} numbers of the current EuclidSet.
  </CardinalityBadge>
</template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
const FailuresSet = computed(() => EuclidSetsStore.getSelected[1])
</script>
