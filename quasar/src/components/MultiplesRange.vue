<template>
  [ {{ min }}, {{ min + EuclidSetsStore.selected.m }}, {{ min + 2 * EuclidSetsStore.selected.m }},
  ..., {{ max - 2 * EuclidSetsStore.selected.m }}, {{ max - EuclidSetsStore.selected.m }},
  {{ max }} ]
  <CardinalityBadge :count="cardinality" />
</template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = computed(() => EuclidSetsStore.getSelected)
const min = computed(() => EuclidSetsStore.selected.m * selectedSet.value?.at(0))
const max = computed(() => EuclidSetsStore.selected.m * selectedSet.value?.at(-1))
const cardinality = computed(() => (max.value - min.value) / EuclidSetsStore.selected.m + 1)
</script>
