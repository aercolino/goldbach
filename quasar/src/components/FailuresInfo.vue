<template>
  <q-icon v-if="FailuresSet.length > 0" :name="matInfo" color="primary" size="sm"
    ><BaseTooltip>
      If you happen to find an individual multiple that keeps failing no matter how big you set the
      limit, then please let me know.
    </BaseTooltip></q-icon
  >
</template>

<script setup>
import BaseTooltip from "./BaseTooltip.vue"
import { computed } from "vue"
import { matInfo } from "@quasar/extras/material-icons"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const store = useEuclidSetsStore()
const FailuresSet = computed(() => store.getSelected[1])
</script>
