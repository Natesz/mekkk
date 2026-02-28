import type { Product } from '~/types/product'

const mockProducts: Product[] = [
  {
    id: 'sos',
    name: 'Sós kecskesajt',
    label: 'sós',
    image: 'https://picsum.photos/seed/kecskesajt-sos/200/200',
    producerIds: ['kovacs-farm', 'hegyi-majorsag'],
  },
  {
    id: 'edes',
    name: 'Édes kecskesajt',
    label: 'édes',
    image: 'https://picsum.photos/seed/kecskesajt-edes/200/200',
    producerIds: ['zold-legelo', 'napfeny-farm'],
  },
  {
    id: 'kapros',
    name: 'Kapros kecskesajt',
    label: 'kapros',
    image: 'https://picsum.photos/seed/kecskesajt-kapros/200/200',
    producerIds: ['zold-legelo', 'hegyi-majorsag'],
  },
  {
    id: 'hazi',
    name: 'Házi kecskesajt',
    label: 'házi',
    image: 'https://picsum.photos/seed/kecskesajt-hazi/200/200',
    producerIds: ['kovacs-farm', 'napfeny-farm'],
  },
  {
    id: 'fustolt',
    name: 'Füstölt kecskesajt',
    label: 'füstölt',
    image: 'https://picsum.photos/seed/kecskesajt-fustolt/200/200',
    producerIds: ['hegyi-majorsag', 'napfeny-farm'],
  },
]

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>(mockProducts)
  const selectedProductId = ref<string | null>(null)

  const selectedProduct = computed(() =>
    products.value.find(p => p.id === selectedProductId.value) ?? null
  )

  function selectProduct(id: string) {
    selectedProductId.value = id
  }

  function resetSelection() {
    selectedProductId.value = null
  }

  return { products, selectedProductId, selectedProduct, selectProduct, resetSelection }
})
