export const useCartStore = defineStore('cart', () => {
  const counts = ref<Record<string, number>>({})
  const prices = ref<Record<string, number>>({})

  const totalItems = computed(() =>
    Object.values(counts.value).reduce((s, v) => s + v, 0),
  )

  const totalPrice = computed(() =>
    Object.entries(counts.value).reduce(
      (s, [id, qty]) => s + qty * (prices.value[id] ?? 0),
      0,
    ),
  )

  function registerPrice(productId: string, price: number) {
    prices.value[productId] = price
  }

  function increment(productId: string) {
    counts.value[productId] = (counts.value[productId] ?? 0) + 1
  }

  function decrement(productId: string) {
    const current = counts.value[productId] ?? 0
    if (current <= 1) {
      delete counts.value[productId]
    } else {
      counts.value[productId] = current - 1
    }
  }

  function getQuantity(productId: string): number {
    return counts.value[productId] ?? 0
  }

  function reset() {
    counts.value = {}
    prices.value = {}
  }

  return { counts, totalItems, totalPrice, registerPrice, increment, decrement, getQuantity, reset }
})
