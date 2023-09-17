<template>
  <q-btn
    size="sm"
    class="q-mx-xs"
    :disable="store.currentPosition === store.firstPosition"
    square
    color="primary"
    :icon="matArrowBack"
    clickable
    @click="store.selectPrevious"
  />
  <q-btn
    size="sm"
    class="q-mx-xs"
    :disable="store.currentPosition === store.lastPosition"
    square
    color="primary"
    :icon="matArrowForward"
    clickable
    @click="store.selectNext"
  />
</template>

<script setup>
import { matArrowBack, matArrowForward } from "@quasar/extras/material-icons"
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
