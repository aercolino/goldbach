<template>
  <div class="col text-body2" :style="{ color: textColor }">
    <slot></slot>
  </div>
</template>

<script setup>
import { colors } from "quasar"
const { getPaletteColor } = colors
const textColor = getPaletteColor("brown-6")
</script>
