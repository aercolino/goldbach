<template>EuclidSet({{ store.selected.c }},{{ store.selected.m }})</template>

<script setup>
import { useEuclidSetsStore } from "src/stores/EuclidSets"
const store = useEuclidSetsStore()
</script>
