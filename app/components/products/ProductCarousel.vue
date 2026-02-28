<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  products: Product[]
  selectedProductId: string | null
}>()

const emit = defineEmits<{
  select: [id: string]
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
  </div>
</template>
