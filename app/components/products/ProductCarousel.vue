<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  selectedProductId: string | null
}>()

const emit = defineEmits<{
  select: [id: string]
  reset: []
}>()
</script>

<template>
  <div class="w-full">
    <div class="flex gap-5 overflow-x-auto px-4 pb-3 scrollbar-hide">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :selected="product.id === selectedProductId"
        @select="emit('select', $event)"
      />
    </div>
    <div
      class="flex justify-center px-4 transition-all duration-300 overflow-hidden"
      :class="selectedProductId ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'"
    >
      <button
        class="text-xs text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:border-green-500 hover:text-green-600 transition-colors"
        @click="emit('reset')"
      >
        Visszaállítás
      </button>
    </div>
  </div>
</template>
