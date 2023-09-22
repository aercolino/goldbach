<template>
  <q-icon v-if="EuclidSet.length === 0" :name="matInfo" color="primary" size="sm"
    ><q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px">
      By definition, the EuclidSet({{ store.selected.c }},{{ store.selected.m }}) is empty because
      its parameters are not relatively prime.
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
