<script setup lang="ts">
useHead({ title: 'Visszaigazolás – MEKKK' })

const route = useRoute()
const cartStore = useCartStore()
const paymentId = computed(() => route.query.paymentId as string | undefined)

onMounted(() => {
  cartStore.reset()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Visszaigazolás' }]" />

    <main class="px-4 py-12 max-w-lg mx-auto flex flex-col items-center text-center">

      <!-- Success icon -->
      <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Köszönjük a rendelést!</h1>
      <p class="text-sm text-gray-500 leading-relaxed mb-2">
        Rendelésedet rögzítettük. A visszaigazolást hamarosan megküldjük e-mailben.
      </p>

      <p v-if="paymentId" class="text-xs text-gray-400 mb-8 font-mono">
        Azonosító: {{ paymentId }}
      </p>
      <div v-else class="mb-8" />

      <NuxtLink
        to="/"
        class="px-8 py-3.5 bg-green-600 text-white rounded-2xl font-semibold text-sm hover:bg-green-700 transition-colors active:scale-[0.99]"
      >
        Vissza a főoldalra
      </NuxtLink>

    </main>
  </div>
</template>
