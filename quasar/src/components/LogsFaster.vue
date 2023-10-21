<template>
  <BaseSummary style="text-align: right">
    <span @click="faster = !faster"
      >logging: {{ faster ? "OFF" : "ON" }}
      <BaseTooltip free-width> {{ faster ? "faster" : "slower" }} </BaseTooltip></span
    >
  </BaseSummary>
</template>

<script setup>
import { ref } from "vue"
import BaseTooltip from "./BaseTooltip.vue"
import BaseSummary from "./BaseSummary.vue"

const faster = ref(false)
</script>
