<script setup lang="ts">
import type { Producer } from '~/types/producer'

defineProps<{
  producer: Producer
}>()
</script>

<template>
  <NuxtLink
    :to="`/producers/${producer.id}`"
    class="block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 active:scale-[0.99]"
  >
    <div class="w-full h-44 overflow-hidden">
      <img
        :src="producer.image"
        :alt="producer.name"
        class="w-full h-full object-cover object-center sm:object-top"
      />
    </div>
    <div class="px-4 py-3">
      <p class="font-semibold text-gray-900 text-base">{{ producer.name }}</p>
      <div class="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
        <span class="flex items-center gap-1">
          <span class="text-green-500 text-base leading-none">★</span>
          <span class="font-medium text-gray-700">{{ producer.rating }}</span>
          <span class="text-gray-400">({{ producer.reviewCount }})</span>
        </span>
        <span class="text-gray-300">·</span>
        <span>{{ producer.deliveryMinutes }} perc</span>
      </div>
    </div>
  </NuxtLink>
</template>
