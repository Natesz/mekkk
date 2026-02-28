<script setup lang="ts">
import type { PopularProduct } from '~/types/producer'

const route = useRoute()
const producersStore = useProducersStore()
const cartStore = useCartStore()

const { currentProducer: producer, otherProducts, loading } = storeToRefs(producersStore)

const deliveryMethod = ref<'delivery' | 'pickup'>('delivery')
const activeModal = ref<PopularProduct | null>(null)

onMounted(async () => {
  cartStore.reset()
  await producersStore.fetchById(route.params.id as string)
})

onUnmounted(() => {
  cartStore.reset()
})

useHead({
  title: computed(() => producer.value ? `${producer.value.name} – MEKKK` : 'MEKKK'),
})
</script>

<template>
  <div class="min-h-screen bg-white" :class="cartStore.totalItems > 0 ? 'pb-28' : ''">
    <AppHeader
      :breadcrumbs="producer
        ? [{ label: 'Főoldal', to: '/' }, { label: producer.name }]
        : [{ label: 'Főoldal', to: '/' }]"
    />

    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>

    <div v-else-if="producer">
      <!-- Hero image -->
      <div class="w-full h-56 sm:h-72 overflow-hidden">
        <img
          :src="producer.image"
          :alt="producer.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Info block -->
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900">{{ producer.name }}</h1>

        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-green-500 text-lg leading-none">★</span>
          <span class="font-semibold text-gray-800">{{ producer.rating }}</span>
          <span class="text-gray-500 text-sm">({{ producer.reviewCount }} értékelés)</span>
        </div>

        <div class="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ producer.address }}
        </div>

        <!-- Delivery toggle -->
        <div class="mt-4 inline-flex bg-gray-100 rounded-full p-1">
          <button
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="deliveryMethod === 'delivery'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'"
            @click="deliveryMethod = 'delivery'"
          >
            Kiszállítás
          </button>
          <button
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="deliveryMethod === 'pickup'
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'"
            @click="deliveryMethod = 'pickup'"
          >
            Átvétel
          </button>
        </div>
      </div>

      <!-- Most ordered products -->
      <div v-if="producer.popularProducts?.length" class="px-4 pb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-2">Legtöbbet rendeltek</h2>
        <div class="flex flex-col">
          <ProductOrderCard
            v-for="product in producer.popularProducts"
            :key="product.id"
            :product="product"
            @open-modal="activeModal = $event"
          />
        </div>
      </div>

      <!-- Other products -->
      <div v-if="otherProducts.length" class="px-4 pb-10">
        <h2 class="text-base font-semibold text-gray-800 mb-2 mt-2">További termékek</h2>
        <div class="flex flex-col">
          <ProductOrderCard
            v-for="product in otherProducts"
            :key="product.id"
            :product="product"
            @open-modal="activeModal = $event"
          />
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center py-20">
      <div class="text-center">
        <p class="text-gray-500">Termelő nem található.</p>
        <NuxtLink to="/" class="text-green-600 text-sm mt-2 block hover:underline">
          &larr; Vissza a főoldalra
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Product modal -->
  <ProductModal
    :product="activeModal"
    @close="activeModal = null"
  />

  <!-- Fixed order bar -->
  <OrderBar />
</template>
