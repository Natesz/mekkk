<script setup lang="ts">
import type { PopularProduct } from '~/types/producer'

const props = defineProps<{ product: PopularProduct }>()
const emit = defineEmits<{ 'open-modal': [product: PopularProduct] }>()

const cartStore = useCartStore()
const quantity = computed(() => cartStore.getQuantity(props.product.id))
const direction = ref<'up' | 'down'>('up')

onMounted(() => {
  cartStore.registerPrice(props.product.id, props.product.price)
})

function handleIncrement() {
  direction.value = 'up'
  cartStore.increment(props.product.id)
}

function handleDecrement() {
  direction.value = 'down'
  cartStore.decrement(props.product.id)
}
</script>

<template>
  <div
    class="flex gap-3 py-3 border-b border-gray-100 last:border-0 cursor-pointer"
    @click="emit('open-modal', product)"
  >
    <!-- Image (~50% width) -->
    <div class="relative w-1/2 flex-shrink-0 rounded-xl overflow-hidden" style="aspect-ratio: 4/3">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />

      <!-- Plus overlay: collapses to square, expands left to minus|counter|plus -->
      <div
        class="absolute top-1.5 right-1.5 h-9 flex items-center bg-green-600 rounded-lg overflow-hidden transition-all duration-200"
        :style="{ width: quantity > 0 ? '5.5rem' : '2.25rem' }"
        @click.stop
      >
        <!-- Minus + counter (visible when expanded) -->
        <template v-if="quantity > 0">
          <button
            class="w-9 h-9 flex items-center justify-center text-white font-bold text-xl leading-none flex-shrink-0"
            @click.stop="handleDecrement"
          >
            −
          </button>
          <!-- Animated counter -->
          <div class="flex-1 relative overflow-hidden flex items-center justify-center" style="height: 1.25rem">
            <Transition :name="`count-${direction}`">
              <span :key="quantity" class="block text-white font-bold text-sm leading-5 text-center">
                {{ quantity }}
              </span>
            </Transition>
          </div>
        </template>

        <!-- Plus button (always rightmost) -->
        <button
          class="w-9 h-9 flex items-center justify-center text-white font-bold text-xl leading-none flex-shrink-0"
          @click.stop="handleIncrement"
        >
          +
        </button>
      </div>
    </div>

    <!-- Info (right half) -->
    <div class="flex-1 min-w-0 flex flex-col justify-center py-1">
      <p class="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">{{ product.name }}</p>
      <p class="text-green-600 font-bold text-sm mt-1">
        {{ product.price.toLocaleString('hu-HU') }} Ft
      </p>
      <p class="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">{{ product.description }}</p>
    </div>
  </div>
</template>
