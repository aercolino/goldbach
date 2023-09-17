<template>
  <CardinalityBadge :set="EuclidSet">
    Numbers of the congruence class of {{ EuclidSetsStore.selected.c }} modulo
    {{ EuclidSetsStore.selected.m }} which are relatively prime to each other, from
    {{ EuclidSetsStore.selected.c + EuclidSetsStore.selected.m }} to
    {{ EuclidSetsStore.selected.c + EuclidSetsStore.selected.m * EuclidSetsStore.selected.l }}.
  </CardinalityBadge>
</template>

<script setup>
import { computed } from "vue"
import CardinalityBadge from "./CardinalityBadge.vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
const EuclidSet = computed(() => EuclidSetsStore.getSelected[0])
</script>
