import type { Product } from '~/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const selectedProductId = ref<string | null>(null)
  const loading = ref(false)

  const selectedProduct = computed(() =>
    products.value.find(p => p.id === selectedProductId.value) ?? null,
  )

  async function fetchProducts() {
    if (products.value.length > 0) return
    loading.value = true
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('products')
      .select('id, name, label, image')
      .order('label')
    if (!error && data) {
      products.value = data as Product[]
    }
    loading.value = false
  }

  function selectProduct(id: string) {
    selectedProductId.value = id
  }

  function resetSelection() {
    selectedProductId.value = null
  }

  return { products, selectedProductId, selectedProduct, loading, fetchProducts, selectProduct, resetSelection }
})
