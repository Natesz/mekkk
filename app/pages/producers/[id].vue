<script setup lang="ts">
const route = useRoute()
const producersStore = useProducersStore()

const producer = computed(() => producersStore.getById(route.params.id as string))

const deliveryMethod = ref<'delivery' | 'pickup'>('delivery')

useHead({
  title: computed(() => producer.value ? `${producer.value.name} – MEKKK` : 'MEKKK'),
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader
      :breadcrumbs="producer
        ? [{ label: 'Főoldal', to: '/' }, { label: producer.name }]
        : [{ label: 'Főoldal', to: '/' }]"
    />

    <div v-if="producer">
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

      <!-- Most popular products -->
      <div class="px-4 pb-10">
        <h2 class="text-base font-semibold text-gray-800 mb-3">Legtöbbet rendeltek</h2>
        <div class="flex flex-col">
          <div
            v-for="product in producer.popularProducts"
            :key="product.id"
            class="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
          >
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ product.name }}</p>
              <p class="text-green-600 font-bold text-sm mt-0.5">
                {{ product.price.toLocaleString('hu-HU') }} Ft
              </p>
              <p class="text-xs text-gray-500 mt-0.5 line-clamp-2">{{ product.description }}</p>
            </div>
            <div class="flex-shrink-0 w-20 h-20">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
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
</template>
