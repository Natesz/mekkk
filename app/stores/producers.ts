import type { Producer, PopularProduct } from '~/types/producer'

export const useProducersStore = defineStore('producers', () => {
  const currentProducers = ref<Producer[]>([])
  const currentProducer = ref<Producer | null>(null)
  const otherProducts = ref<PopularProduct[]>([])
  const loading = ref(false)

  async function fetchByProductId(productId: string) {
    loading.value = true
    currentProducers.value = []
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('producers')
      .select('id, name, image, rating, review_count, delivery_minutes, address, producer_products!inner(product_id)')
      .eq('producer_products.product_id', productId)
    if (!error && data) {
      currentProducers.value = data.map((row: any) => ({
        id: row.id,
        name: row.name,
        image: row.image ?? '',
        rating: row.rating,
        reviewCount: row.review_count,
        deliveryMinutes: row.delivery_minutes,
        address: row.address,
      }))
    }
    loading.value = false
  }

  async function fetchById(id: string) {
    loading.value = true
    currentProducer.value = null
    otherProducts.value = []
    const supabase = useSupabase()
    // Note: product_id column in popular_products requires the PRD 05 SQL migration.
    // Select without it to stay compatible before migration runs.
    const { data, error } = await supabase
      .from('producers')
      .select('id, name, image, rating, review_count, delivery_minutes, address, popular_products(id, name, price, description, image)')
      .eq('id', id)
      .single()
    if (!error && data) {
      const row = data as any
      const popularRows: any[] = row.popular_products ?? []
      currentProducer.value = {
        id: row.id,
        name: row.name,
        image: row.image ?? '',
        rating: row.rating,
        reviewCount: row.review_count,
        deliveryMinutes: row.delivery_minutes,
        address: row.address,
        popularProducts: popularRows.map((pp: any) => ({
          id: pp.id,
          name: pp.name,
          price: pp.price,
          description: pp.description ?? '',
          image: pp.image ?? '',
        })),
      }
      // Exclude products whose name already appears in popularProducts
      const excludeNames = new Set(popularRows.map((pp: any) => pp.name))
      await fetchOtherProducts(id, excludeNames)
    }
    loading.value = false
  }

  async function fetchOtherProducts(producerId: string, excludeNames: Set<string>) {
    const supabase = useSupabase()

    // Try with price + description (requires PRD 05 migration)
    let { data, error } = await supabase
      .from('producer_products')
      .select('products(id, name, price, description, image)')
      .eq('producer_id', producerId)

    // Fallback: columns may not exist yet (400 means column missing)
    if (error) {
      const fallback = await supabase
        .from('producer_products')
        .select('products(id, name, image)')
        .eq('producer_id', producerId)
      data = fallback.data
      error = fallback.error
    }

    if (!error && data) {
      otherProducts.value = (data as any[])
        .map((row: any) => row.products)
        .filter((p: any) => p && !excludeNames.has(p.name))
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price ?? 0,
          description: p.description ?? '',
          image: p.image ?? '',
        }))
    }
  }

  async function fetchAll() {
    loading.value = true
    currentProducers.value = []
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('producers')
      .select('id, name, image, rating, review_count, delivery_minutes, address')
    if (!error && data) {
      currentProducers.value = data.map((row: any) => ({
        id: row.id,
        name: row.name,
        image: row.image ?? '',
        rating: row.rating,
        reviewCount: row.review_count,
        deliveryMinutes: row.delivery_minutes,
        address: row.address,
      }))
    }
    loading.value = false
  }

  function clearCurrentProducers() {
    currentProducers.value = []
  }

  return {
    currentProducers, currentProducer, otherProducts, loading,
    fetchByProductId, fetchById, fetchAll, clearCurrentProducers,
  }
})
