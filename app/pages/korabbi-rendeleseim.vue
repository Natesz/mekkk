<script setup lang="ts">
useHead({ title: 'Korábbi rendeléseim – MEKKK' })

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
}

interface Order {
  id: string
  created_at: string
  producer_id: string | null
  producer_name: string | null
  total_amount: number
  items: OrderItem[]
  customer_name: string | null
  customer_email: string | null
}

const supabase = useSupabase()
const orders = ref<Order[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  orders.value = (data ?? []) as Order[]
  loading.value = false
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Korábbi rendeléseim' }]" />

    <main class="px-4 py-6 max-w-lg mx-auto">
      <h1 class="text-xl font-bold text-gray-900 mb-5">Korábbi rendeléseim</h1>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Empty state -->
      <div v-else-if="orders.length === 0" class="flex flex-col items-center py-20 gap-4">
        <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p class="text-gray-500 text-sm">Még nincsenek rendeléseid.</p>
        <NuxtLink
          to="/"
          class="mt-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
        >
          Vissza a főoldalra
        </NuxtLink>
      </div>

      <!-- Order list -->
      <div v-else class="space-y-3">
        <div
          v-for="order in orders"
          :key="order.id"
          class="rounded-2xl border border-gray-100 px-4 py-4 shadow-sm"
        >
          <!-- Top: customer name or producer name -->
          <p class="font-semibold text-gray-900 text-sm mb-0.5">
            {{ order.customer_name ?? order.producer_name ?? 'Ismeretlen termelő' }}
          </p>

          <!-- Email a név alatt -->
          <p v-if="order.customer_email" class="text-xs text-gray-400 mb-0.5">
            {{ order.customer_email }}
          </p>

          <!-- Producer a customer_name alatt -->
          <p v-if="order.customer_name && order.producer_name" class="text-xs text-gray-500 mb-2">
            {{ order.producer_name }}
          </p>

          <!-- Timestamp + total -->
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-400">{{ formatDate(order.created_at) }}</span>
            <span class="text-sm font-bold text-green-600">
              {{ order.total_amount.toLocaleString('hu-HU') }} Ft
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
