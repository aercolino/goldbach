<template>
  <q-icon v-if="FailuresSet.length > 0" :name="matInfo" color="primary" size="sm"
    ><q-tooltip class="bg-amber text-black shadow-4" :offset="[10, 10]" style="width: 200px">
      It's possible that a few of these failures are wrong and could in fact be written using the
      current EuclidSet, but I traded exhaustive search for maximum speed.
    </q-tooltip></q-icon
  >
</template>

<script setup>
import { computed } from "vue"
import { matInfo } from "@quasar/extras/material-icons"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const store = useEuclidSetsStore()
const FailuresSet = computed(() => store.getSelected[1])
</script>
