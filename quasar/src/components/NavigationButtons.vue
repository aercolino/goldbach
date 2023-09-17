<template>
  <q-btn
    size="sm"
    class="q-mx-xs"
    :disable="EuclidSetsStore.currentPosition === EuclidSetsStore.firstPosition"
    square
    color="primary"
    :icon="matArrowBack"
    clickable
    @click="EuclidSetsStore.selectPrevious"
  />
  <q-btn
    size="sm"
    class="q-mx-xs"
    :disable="EuclidSetsStore.currentPosition === EuclidSetsStore.lastPosition"
    square
    color="primary"
    :icon="matArrowForward"
    clickable
    @click="EuclidSetsStore.selectNext"
  />
</template>

<script setup>
import { matArrowBack, matArrowForward } from "@quasar/extras/material-icons"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const EuclidSetsStore = useEuclidSetsStore()
</script>
