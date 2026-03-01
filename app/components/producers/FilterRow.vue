<script setup lang="ts">
const props = defineProps<{
  filter30min: boolean
  ratingThreshold: number | null
  ratingLabel: string
  filterMostRatings: boolean
  sortBy: 'rating' | 'arrival' | null
}>()

const emit = defineEmits<{
  toggle30min: []
  openRating: []
  toggleMostRatings: []
  openSorting: []
}>()

const sortingActive = computed(() => props.sortBy !== null)
const ratingActive = computed(() => props.ratingThreshold !== null)

const sortingLabel = computed(() =>
  props.sortBy === 'rating' ? 'Értékelés alapján' : props.sortBy === 'arrival' ? 'Legkorábbi' : 'Rendezés',
)
</script>

<template>
  <div class="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide">
    <button
      class="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
      :class="filter30min
        ? 'bg-green-600 text-white border-green-600'
        : 'bg-white text-green-600 border-green-600'"
      @click="emit('toggle30min')"
    >
      30 perc alatt
    </button>

    <!-- Értékelés threshold filter -->
    <button
      class="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
      :class="ratingActive
        ? 'bg-green-600 text-white border-green-600'
        : 'bg-white text-green-600 border-green-600'"
      @click="emit('openRating')"
    >
      {{ ratingLabel }}
      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Legtöbb értékelés toggle -->
    <button
      class="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
      :class="filterMostRatings
        ? 'bg-green-600 text-white border-green-600'
        : 'bg-white text-green-600 border-green-600'"
      @click="emit('toggleMostRatings')"
    >
      Legtöbb értékelés
    </button>

    <!-- Rendezés dropdown -->
    <button
      class="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
      :class="sortingActive
        ? 'bg-green-600 text-white border-green-600'
        : 'bg-white text-green-600 border-green-600'"
      @click="emit('openSorting')"
    >
      {{ sortingLabel }}
      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>
