<template>
  <q-icon v-if="EuclidSet.length === 0" :name="matInfo" color="primary" size="sm"
    ><q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px">
      The class ({{ store.selected.c }}) and the modulus ({{ store.selected.m }}) need not to share
      any prime factors, i.e. they need to be relatively prime.
    </q-tooltip></q-icon
  >
</template>

<script setup>
import { computed } from "vue"
import { matInfo } from "@quasar/extras/material-icons"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const store = useEuclidSetsStore()
const EuclidSet = computed(() => store.getSelected[0])
</script>
