<template>
  <div class="col text-body1">
    <span
      >| <FiniteEuclidSet /> | = {{ EuclidSet.length }}
      <BaseTooltip>
        Numbers of the congruence class of {{ store.selected.c }} modulo
        {{ store.selected.m }} which are relatively prime to each other, from
        {{ store.selected.c + store.selected.m }} to
        {{ store.selected.c + store.selected.m * store.selected.l }}.
      </BaseTooltip></span
    >
  </div>
</template>

<script setup>
import BaseTooltip from "./BaseTooltip.vue"
import FiniteEuclidSet from "./FiniteEuclidSet.vue"
import { computed } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
</script>
