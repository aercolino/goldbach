<template>{{ failures }} <CardinalityBadge :count="cardinality" /></template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const EuclidSetsStore = useEuclidSetsStore()
const failures = computed(() => EuclidSetsStore.getSelected[1])
const cardinality = computed(() => failures.value.length)
</script>
