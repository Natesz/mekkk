<script setup lang="ts">
import type { Producer } from '~/types/producer'

defineProps<{
  producers: Producer[]
}>()
</script>

<template>
  <div class="px-4">
    <p class="text-sm text-gray-500 mb-3">
      <span class="font-semibold text-gray-800">{{ producers.length }}</span> találat
    </p>
    <div class="grid grid-cols-3 gap-1 sm:grid-cols-4">
      <ProducerCard
        v-for="producer in producers"
        :key="producer.id"
        :producer="producer"
      />
    </div>
  </div>
</template>
