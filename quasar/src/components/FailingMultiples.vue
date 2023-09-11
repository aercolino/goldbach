<template>{{ failing }} <CardinalityBadge :count="cardinality" /></template>

<script setup>
import { computed } from "vue"
import { XGC_EuclidSet, XGC_Partition } from "src/maths/XGC.js"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
import { arrayRange } from "src/utils"

const EuclidSetsStore = useEuclidSetsStore()
const failing = computed(() => {
  const selectedSet = EuclidSetsStore.getSelected
  const multiples = arrayRange(
    selectedSet?.at(0) * EuclidSetsStore.selected.m,
    selectedSet?.at(-1) * EuclidSetsStore.selected.m,
    EuclidSetsStore.selected.m
  )
  const partition = new XGC_Partition(
    new XGC_EuclidSet(
      EuclidSetsStore.selected.c,
      EuclidSetsStore.selected.m,
      EuclidSetsStore.selected.l,
      selectedSet
    )
  )
  const failures = multiples.filter((n) => partition.get(n) === undefined)
  console.log(
    "failures / multiples =",
    ((failures.length / multiples.length) * 100).toFixed(0),
    "%"
  )
  return failures
})
const cardinality = computed(() => failing.value.length)
</script>
