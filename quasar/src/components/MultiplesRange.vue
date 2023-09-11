<template>
  [{{ EuclidSetsStore.selected.m * selectedSet.at(0) }},
  {{ EuclidSetsStore.selected.m * selectedSet.at(-1) }}]
</template>

<script setup>
import { computed } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
const selectedSet = computed(() => EuclidSetsStore.getSelected?.getValues() || [])
</script>
