<template>
  <q-chip
    class="q-ma-none"
    size="sm"
    clickable
    color="amber"
    label="to the infinity and beyond"
    @click="prompt = true"
  />
  <q-dialog
    v-model="prompt"
    persistent
    @update:model-value="(value) => !value && store.setSelected({ ...store.selected, l: limit })"
  >
    <q-card style="width: 250px">
      <q-card-section>
        <div class="text-h6">Set a bigger limit</div>
        With infinite many numbers in the <i>EuclidSet(c,m)</i> you wouldn't see any failures,
        unless the XGC doesn't stand. <br />
        As an infinity surrogate, you can set a bigger limit and see for yourself that new failures
        lie beyond previous ones.
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="limit" dense autofocus />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup flat label="Set" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useEuclidSetsStore } from "src/stores/EuclidSets"

const prompt = ref(false)
const store = useEuclidSetsStore()
const limit = ref(store.selected.l)
</script>
