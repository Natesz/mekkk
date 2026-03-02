<script setup lang="ts">
useHead({ title: 'Visszaigazolás – MEKKK' })

const route = useRoute()
const cartStore = useCartStore()
const paymentId = route.query.paymentId as string | undefined

const verifying = ref(true)
const succeeded = ref(false)
const verifyError = ref(false)

onMounted(async () => {
  cartStore.reset()

  if (!paymentId) {
    verifying.value = false
    return
  }

  try {
    const result = await $fetch<{ succeeded: boolean }>('/api/barion-verify', {
      method: 'POST',
      body: { paymentId },
    })
    succeeded.value = result.succeeded
  } catch {
    verifyError.value = true
  } finally {
    verifying.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Visszaigazolás' }]" />

    <main class="px-4 py-12 max-w-lg mx-auto flex flex-col items-center text-center">

      <!-- Loading -->
      <div v-if="verifying" class="flex flex-col items-center gap-4 py-10">
        <div class="w-10 h-10 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        <p class="text-sm text-gray-500">Fizetés ellenőrzése...</p>
      </div>

      <!-- Success -->
      <template v-else-if="succeeded">
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
      </template>

      <!-- Verify error (server/network hiba) -->
      <template v-else-if="verifyError">
        <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Köszönjük a rendelést!</h1>
        <p class="text-sm text-gray-500 leading-relaxed mb-8">
          A fizetésed sikeresen megtörtént. Rendelésedet hamarosan visszaigazoljuk.
        </p>
      </template>

      <!-- Failed -->
      <template v-else>
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">A fizetés nem sikerült</h1>
        <p class="text-sm text-gray-500 leading-relaxed mb-8">
          A tranzakció nem volt sikeres. Nem kerültél megterhelésre.
        </p>
      </template>

      <NuxtLink
        v-if="!verifying"
        to="/"
        class="px-8 py-3.5 bg-green-600 text-white rounded-2xl font-semibold text-sm hover:bg-green-700 transition-colors active:scale-[0.99]"
      >
        Vissza a főoldalra
      </NuxtLink>

    </main>
  </div>
</template>
