<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
  selected: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <button
    class="flex flex-col items-center gap-2 min-w-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-xl"
    @click="emit('select', product.id)"
  >
    <div class="relative w-16 h-16">
      <div
        class="absolute inset-0 rounded-xl transition-all duration-300"
        :class="selected ? 'bg-green-500' : 'bg-green-100'"
      />
      <img
        :src="product.image"
        :alt="product.name"
        class="relative w-full h-full object-cover rounded-full transition-all duration-300"
        :class="selected ? 'scale-105 ring-2 ring-green-600 ring-offset-1' : ''"
      />
    </div>
    <span
      class="text-xs font-medium text-center leading-tight max-w-[64px] truncate transition-colors duration-300"
      :class="selected ? 'text-green-700' : 'text-gray-600'"
    >
      {{ product.label }}
    </span>
  </button>
</template>
