import type { Producer } from '~/types/producer'

export const useProducersStore = defineStore('producers', () => {
  const currentProducers = ref<Producer[]>([])
  const currentProducer = ref<Producer | null>(null)
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
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('producers')
      .select('id, name, image, rating, review_count, delivery_minutes, address, popular_products(id, name, price, description, image)')
      .eq('id', id)
      .single()
    if (!error && data) {
      const row = data as any
      currentProducer.value = {
        id: row.id,
        name: row.name,
        image: row.image ?? '',
        rating: row.rating,
        reviewCount: row.review_count,
        deliveryMinutes: row.delivery_minutes,
        address: row.address,
        popularProducts: (row.popular_products ?? []).map((pp: any) => ({
          id: pp.id,
          name: pp.name,
          price: pp.price,
          description: pp.description ?? '',
          image: pp.image ?? '',
        })),
      }
    }
    loading.value = false
  }

  function clearCurrentProducers() {
    currentProducers.value = []
  }

  return { currentProducers, currentProducer, loading, fetchByProductId, fetchById, clearCurrentProducers }
})
