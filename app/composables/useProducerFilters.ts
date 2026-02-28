import type { Producer } from '~/types/producer'

export function useProducerFilters() {
  const filter30min = ref(false)
  const filterTopRating = ref(false)
  const sortBy = ref<'rating' | 'arrival' | null>(null)
  const sortingSheetOpen = ref(false)

  function applyFilters(producers: Producer[]): Producer[] {
    let result = [...producers]

    if (filter30min.value) {
      result = result.filter(p => p.deliveryMinutes < 30)
    }

    // Custom sorting overrides quick filter
    if (sortBy.value === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy.value === 'arrival') {
      result.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes)
    } else if (filterTopRating.value) {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }

  function reset() {
    filter30min.value = false
    filterTopRating.value = false
    sortBy.value = null
    sortingSheetOpen.value = false
  }

  return {
    filter30min,
    filterTopRating,
    sortBy,
    sortingSheetOpen,
    applyFilters,
    reset,
  }
}
