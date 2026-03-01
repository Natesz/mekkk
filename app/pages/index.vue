<script setup lang="ts">
const productsStore = useProductsStore()
const producersStore = useProducersStore()

const { products, selectedProductId, selectedProduct, loading: productsLoading } = storeToRefs(productsStore)

const {
  filter30min,
  ratingThreshold,
  filterMostRatings,
  sortBy,
  sortingSheetOpen,
  ratingSheetOpen,
  ratingLabel,
  applyFilters,
  reset: resetFilters,
} = useProducerFilters()

const visibleProducers = computed(() => applyFilters(producersStore.currentProducers))

onMounted(async () => {
  productsStore.fetchProducts()
  await producersStore.fetchAll()
})

async function handleSelectProduct(id: string) {
  if (productsStore.selectedProductId === id) {
    productsStore.resetSelection()
    resetFilters()
    await producersStore.fetchAll()
  } else {
    productsStore.selectProduct(id)
    resetFilters()
    await producersStore.fetchByProductId(id)
  }
}

async function handleReset() {
  productsStore.resetSelection()
  resetFilters()
  await producersStore.fetchAll()
}

function toggle30min() {
  filter30min.value = !filter30min.value
}

function toggleMostRatings() {
  filterMostRatings.value = !filterMostRatings.value
}

function handleApplySort(sort: 'rating' | 'arrival' | null) {
  sortBy.value = sort
  sortingSheetOpen.value = false
}

function handleResetSort() {
  sortBy.value = null
  sortingSheetOpen.value = false
}

function handleApplyRating(threshold: number) {
  ratingThreshold.value = threshold
  ratingSheetOpen.value = false
}

function handleResetRating() {
  ratingThreshold.value = null
  ratingSheetOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <main>
      <section class="pt-4">
        <div v-if="productsLoading" class="flex justify-center py-6">
          <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <ProductCarousel
          v-else
          :products="products"
          :selected-product-id="selectedProductId"
          @select="handleSelectProduct"
        />
      </section>

      <section class="mt-3">
        <FilterRow
          :filter30min="filter30min"
          :rating-threshold="ratingThreshold"
          :rating-label="ratingLabel"
          :filter-most-ratings="filterMostRatings"
          :sort-by="sortBy"
          @toggle30min="toggle30min"
          @open-rating="ratingSheetOpen = true"
          @toggle-most-ratings="toggleMostRatings"
          @open-sorting="sortingSheetOpen = true"
        />
      </section>

      <section class="mt-4 pb-8">
        <div v-if="producersStore.loading" class="flex justify-center py-8">
          <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <ProducerList
          v-else
          :producers="visibleProducers"
          @reset="handleReset"
        />
      </section>
    </main>

    <SortingBottomSheet
      :open="sortingSheetOpen"
      :current-sort="sortBy"
      @apply="handleApplySort"
      @reset="handleResetSort"
      @close="sortingSheetOpen = false"
    />

    <RatingBottomSheet
      :open="ratingSheetOpen"
      :current-threshold="ratingThreshold"
      @apply="handleApplyRating"
      @reset="handleResetRating"
      @close="ratingSheetOpen = false"
    />
  </div>
</template>
