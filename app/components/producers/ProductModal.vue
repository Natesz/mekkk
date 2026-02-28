<script setup lang="ts">
import type { PopularProduct } from '~/types/producer'

const props = defineProps<{ product: PopularProduct | null }>()
const emit = defineEmits<{ close: [] }>()

const cartStore = useCartStore()
const quantity = computed(() => props.product ? cartStore.getQuantity(props.product.id) : 0)
const direction = ref<'up' | 'down'>('up')

const productTotal = computed(() =>
  props.product ? quantity.value * props.product.price : 0,
)

function handleIncrement() {
  if (!props.product) return
  direction.value = 'up'
  cartStore.increment(props.product.id)
}

function handleDecrement() {
  if (!props.product || quantity.value === 0) return
  direction.value = 'down'
  cartStore.decrement(props.product.id)
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="product"
        class="fixed inset-0 z-40 bg-black/50"
        @click="emit('close')"
      />
    </Transition>

    <!-- Modal panel (~75% screen height, slides up from bottom) -->
    <Transition name="slide-up">
      <div
        v-if="product"
        class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl flex flex-col"
        style="height: 75vh"
      >
        <!-- Product image -->
        <div class="relative w-full flex-shrink-0" style="height: 45%">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover rounded-t-2xl"
          />
          <!-- X button -->
          <button
            class="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            @click="emit('close')"
          >
            <svg class="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex flex-col flex-1 px-5 py-4 overflow-y-auto">
          <h2 class="text-xl font-bold text-gray-900 leading-snug">{{ product.name }}</h2>
          <p class="text-green-600 font-bold text-lg mt-1">
            {{ product.price.toLocaleString('hu-HU') }} Ft
          </p>
          <p class="text-sm text-gray-500 mt-3 leading-relaxed flex-1">
            {{ product.description }}
          </p>

          <!-- Bottom row: counter + Hozzáadás -->
          <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <!-- Counter -->
            <div class="flex items-center bg-green-600 rounded-xl overflow-hidden h-11">
              <button
                class="w-11 h-11 flex items-center justify-center text-white font-bold text-xl leading-none"
                :class="quantity === 0 ? 'opacity-40' : ''"
                @click="handleDecrement"
              >
                −
              </button>
              <div class="relative overflow-hidden flex items-center justify-center" style="width: 2rem; height: 1.5rem">
                <Transition :name="`count-${direction}`">
                  <span :key="quantity" class="block text-white font-bold text-base leading-6 text-center">
                    {{ quantity }}
                  </span>
                </Transition>
              </div>
              <button
                class="w-11 h-11 flex items-center justify-center text-white font-bold text-xl leading-none"
                @click="handleIncrement"
              >
                +
              </button>
            </div>

            <!-- Hozzáadás button -->
            <button
              class="flex-1 h-11 bg-green-600 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 px-3"
              @click="emit('close')"
            >
              Hozzáadás
              <span v-if="productTotal > 0" class="bg-white/20 rounded-lg px-2 py-0.5 text-xs font-bold">
                {{ productTotal.toLocaleString('hu-HU') }} Ft
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
