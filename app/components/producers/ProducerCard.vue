<script setup lang="ts">
import type { Producer } from '~/types/producer'

defineProps<{
  producer: Producer
}>()
</script>

<template>
  <NuxtLink
    :to="`/producers/${producer.id}`"
    class="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-colors active:bg-gray-100"
  >
    <div class="w-20 h-20">
      <img
        :src="producer.image"
        :alt="producer.name"
        class="w-full h-full object-cover rounded-full border-2 border-green-100"
      />
    </div>
    <div class="text-center">
      <p class="text-sm font-semibold text-gray-800 leading-tight">{{ producer.name }}</p>
      <p class="text-xs text-gray-500 mt-0.5">
        <span class="text-green-500">★</span>
        {{ producer.rating }} ({{ producer.reviewCount }})
      </p>
      <p class="text-xs text-gray-400 mt-0.5">{{ producer.deliveryTime }}</p>
    </div>
  </NuxtLink>
</template>
