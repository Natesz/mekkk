import type { Producer } from '~/types/producer'

const mockProducers: Producer[] = [
  {
    id: 'kovacs-farm',
    name: 'Kovács Farm',
    image: 'https://picsum.photos/seed/kovacs-farm/400/400',
    rating: 4.8,
    reviewCount: 132,
    deliveryMinutes: 18,
    address: '2040 Budaörs, Legelő utca 12.',
    productIds: ['sos', 'hazi'],
    popularProducts: [
      { id: 'kf-1', name: 'Sós kecskesajt', price: 1490, description: 'Friss, kézműves sós sajt', image: 'https://picsum.photos/seed/kf-prod-1/120/120' },
      { id: 'kf-2', name: 'Házi kecskesajt', price: 1290, description: 'Lágy, natúr házisajt', image: 'https://picsum.photos/seed/kf-prod-2/120/120' },
      { id: 'kf-3', name: 'Kecsketúró', price: 890, description: 'Friss kecsketúró', image: 'https://picsum.photos/seed/kf-prod-3/120/120' },
    ],
  },
  {
    id: 'zold-legelo',
    name: 'Zöld Legelő',
    image: 'https://picsum.photos/seed/zold-legelo/400/400',
    rating: 4.6,
    reviewCount: 87,
    deliveryMinutes: 24,
    address: '2073 Zsámbék, Rét út 5.',
    productIds: ['edes', 'kapros'],
    popularProducts: [
      { id: 'zl-1', name: 'Édes kecskesajt', price: 1390, description: 'Mézes, enyhén édes sajt', image: 'https://picsum.photos/seed/zl-prod-1/120/120' },
      { id: 'zl-2', name: 'Kapros kecskesajt', price: 1490, description: 'Friss kapros fűszerezéssel', image: 'https://picsum.photos/seed/zl-prod-2/120/120' },
    ],
  },
  {
    id: 'hegyi-majorsag',
    name: 'Hegyi Majorság',
    image: 'https://picsum.photos/seed/hegyi-majorsag/400/400',
    rating: 4.9,
    reviewCount: 214,
    deliveryMinutes: 42,
    address: '2025 Visegrád, Hegyi dűlő 3.',
    productIds: ['sos', 'kapros', 'fustolt'],
    popularProducts: [
      { id: 'hm-1', name: 'Füstölt kecskesajt', price: 1890, description: 'Bükkfán füstölve, intenzív ízű', image: 'https://picsum.photos/seed/hm-prod-1/120/120' },
      { id: 'hm-2', name: 'Sós kecskesajt', price: 1490, description: 'Hagyományos recept szerint', image: 'https://picsum.photos/seed/hm-prod-2/120/120' },
      { id: 'hm-3', name: 'Kapros kecskesajt', price: 1590, description: 'Friss kapros fűszerezéssel', image: 'https://picsum.photos/seed/hm-prod-3/120/120' },
    ],
  },
  {
    id: 'napfeny-farm',
    name: 'Napfény Farm',
    image: 'https://picsum.photos/seed/napfeny-farm/400/400',
    rating: 4.5,
    reviewCount: 63,
    deliveryMinutes: 27,
    address: '7621 Pécs, Napfény sor 8.',
    productIds: ['edes', 'hazi', 'fustolt'],
    popularProducts: [
      { id: 'nf-1', name: 'Házi kecskesajt', price: 1190, description: 'Egyszerű, natúr ízvilág', image: 'https://picsum.photos/seed/nf-prod-1/120/120' },
      { id: 'nf-2', name: 'Füstölt kecskesajt', price: 1790, description: 'Enyhén füstölt változat', image: 'https://picsum.photos/seed/nf-prod-2/120/120' },
    ],
  },
]

export const useProducersStore = defineStore('producers', () => {
  const producers = ref<Producer[]>(mockProducers)

  function getById(id: string): Producer | undefined {
    return producers.value.find(p => p.id === id)
  }

  function getByProductId(productId: string): Producer[] {
    return producers.value.filter(p => p.productIds.includes(productId))
  }

  return { producers, getById, getByProductId }
})
