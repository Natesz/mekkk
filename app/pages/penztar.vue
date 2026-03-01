<script setup lang="ts">
useHead({ title: 'Pénztár – MEKKK' })

const cartStore = useCartStore()
const router = useRouter()
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(() => {
  if (cartStore.totalItems === 0) router.replace('/')
})

async function payWithBarion() {
  if (isLoading.value) return
  isLoading.value = true
  error.value = null

  try {
    const { gatewayUrl } = await $fetch<{ gatewayUrl: string; paymentId: string }>('/api/barion-start', {
      method: 'POST',
      body: {
        items: cartStore.orderedItems.map(i => ({
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.price,
        })),
        total: cartStore.totalPrice,
        note: cartStore.note || undefined,
      },
    })
    window.location.href = gatewayUrl
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Nem sikerült a fizetés elindítása. Kérjük próbáld újra.'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Pénztár' }]" />

    <main class="px-4 py-6 max-w-lg mx-auto">

      <!-- Order summary -->
      <h2 class="text-lg font-bold text-gray-900 mb-4">Rendelés összesítő</h2>

      <div class="rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div
          v-for="item in cartStore.orderedItems"
          :key="item.id"
          class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0"
        >
          <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-900 line-clamp-1">{{ item.name }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ item.quantity }} × {{ item.price.toLocaleString('hu-HU') }} Ft</p>
          </div>
          <p class="text-sm font-bold text-gray-900 flex-shrink-0">
            {{ (item.quantity * item.price).toLocaleString('hu-HU') }} Ft
          </p>
        </div>
      </div>

      <!-- Note -->
      <div v-if="cartStore.note" class="rounded-2xl border border-gray-100 px-4 py-3 mb-4">
        <p class="text-xs text-gray-400 mb-1">Megjegyzés</p>
        <p class="text-sm text-gray-700">{{ cartStore.note }}</p>
      </div>

      <!-- Total -->
      <div class="flex items-center justify-between px-4 py-4 bg-gray-50 rounded-2xl mb-6">
        <span class="text-base font-semibold text-gray-800">Összesen</span>
        <span class="text-xl font-bold text-gray-900">{{ cartStore.totalPrice.toLocaleString('hu-HU') }} Ft</span>
      </div>

      <!-- Error -->
      <div v-if="error" class="rounded-xl bg-red-50 border border-red-100 px-4 py-3 mb-4">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Barion pay button -->
      <button
        class="w-full py-4 bg-green-600 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.99] transition-transform disabled:opacity-60"
        :disabled="isLoading"
        @click="payWithBarion"
      >
        <span v-if="isLoading" class="flex items-center gap-2">
          <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Átirányítás...
        </span>
        <span v-else class="flex items-center gap-3">
          <span>Fizetés Barionnal</span>
          <img src="/pictures/barion-card.svg" class="h-5" alt="Barion" onerror="this.style.display='none'" />
        </span>
      </button>

      <p class="text-center text-xs text-gray-400 mt-3">
        Biztonságos fizetés a Barion oldalán. Kártyaadataidat mi nem látjuk.
      </p>

    </main>
  </div>
</template>
