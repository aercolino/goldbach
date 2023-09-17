<template>
  <CardinalityBadge :set="EuclidSet">
    Numbers of the congruence class of {{ store.selected.c }} modulo {{ store.selected.m }} which
    are relatively prime to each other, from {{ store.selected.c + store.selected.m }} to
    {{ store.selected.c + store.selected.m * store.selected.l }}.
  </CardinalityBadge>
</template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
</script>
