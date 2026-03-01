interface ProductDetail {
  name: string
  image: string
  price: number
}

export const useCartStore = defineStore('cart', () => {
  const counts = ref<Record<string, number>>({})
  const productDetails = ref<Record<string, ProductDetail>>({})
  const note = ref('')
  const rendelesedOpen = ref(false)

  const totalItems = computed(() =>
    Object.values(counts.value).reduce((s, v) => s + v, 0),
  )

  const totalPrice = computed(() =>
    Object.entries(counts.value).reduce(
      (s, [id, qty]) => s + qty * (productDetails.value[id]?.price ?? 0),
      0,
    ),
  )

  const orderedItems = computed(() =>
    Object.entries(counts.value)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        id,
        quantity: qty,
        name: productDetails.value[id]?.name ?? '',
        image: productDetails.value[id]?.image ?? '',
        price: productDetails.value[id]?.price ?? 0,
      })),
  )

  function registerProduct(id: string, name: string, price: number, image: string) {
    productDetails.value[id] = { name, price, image }
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

  function removeProduct(productId: string) {
    delete counts.value[productId]
  }

  function getQuantity(productId: string): number {
    return counts.value[productId] ?? 0
  }

  function reset() {
    counts.value = {}
    productDetails.value = {}
    note.value = ''
    rendelesedOpen.value = false
  }

  return {
    counts, productDetails, note, rendelesedOpen,
    totalItems, totalPrice, orderedItems,
    registerProduct, increment, decrement, removeProduct, getQuantity, reset,
  }
})
