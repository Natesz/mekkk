import type { Producer } from '~/types/producer'

export function useProducerFilters() {
  const filter30min = ref(false)
  const ratingThreshold = ref<number | null>(null)
  const filterMostRatings = ref(false)
  const sortBy = ref<'rating' | 'arrival' | null>(null)
  const sortingSheetOpen = ref(false)
  const ratingSheetOpen = ref(false)

  const ratingThresholdLabels: Record<number, string> = {
    3: '3 felett',
    3.5: '3,5 felett',
    4: '4 felett',
    4.5: '4,5 felett',
    5: 'pontosan 5',
  }

  const ratingLabel = computed(() =>
    ratingThreshold.value !== null
      ? (ratingThresholdLabels[ratingThreshold.value] ?? 'Értékelés')
      : 'Értékelés',
  )

  function applyFilters(producers: Producer[]): Producer[] {
    let result = [...producers]

    if (filter30min.value) {
      result = result.filter(p => p.deliveryMinutes < 30)
    }

    if (ratingThreshold.value !== null) {
      if (ratingThreshold.value === 5) {
        result = result.filter(p => p.rating === 5)
      } else {
        result = result.filter(p => p.rating >= ratingThreshold.value!)
      }
    }

    if (filterMostRatings.value) {
      result = result.filter(p => p.reviewCount >= 100)
    }

    if (sortBy.value === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy.value === 'arrival') {
      result.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes)
    }

    return result
  }

  function reset() {
    filter30min.value = false
    ratingThreshold.value = null
    filterMostRatings.value = false
    sortBy.value = null
    sortingSheetOpen.value = false
    ratingSheetOpen.value = false
  }

  return {
    filter30min,
    ratingThreshold,
    filterMostRatings,
    sortBy,
    sortingSheetOpen,
    ratingSheetOpen,
    ratingLabel,
    applyFilters,
    reset,
  }
}
