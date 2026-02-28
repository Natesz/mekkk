<script setup lang="ts">
const productsStore = useProductsStore()
const producersStore = useProducersStore()

const { products, selectedProductId, selectedProduct, loading: productsLoading } = storeToRefs(productsStore)

const {
  filter30min,
  filterTopRating,
  sortBy,
  sortingSheetOpen,
  applyFilters,
  reset: resetFilters,
} = useProducerFilters()

const visibleProducers = computed(() => applyFilters(producersStore.currentProducers))

onMounted(() => {
  productsStore.fetchProducts()
})

async function handleSelectProduct(id: string) {
  productsStore.selectProduct(id)
  resetFilters()
  await producersStore.fetchByProductId(id)
}

function toggle30min() {
  filter30min.value = !filter30min.value
}

function toggleTopRating() {
  filterTopRating.value = !filterTopRating.value
}

function handleReset() {
  productsStore.resetSelection()
  producersStore.clearCurrentProducers()
  resetFilters()
}

function handleApplySort(sort: 'rating' | 'arrival' | null) {
  sortBy.value = sort
  sortingSheetOpen.value = false
}

function handleResetSort() {
  sortBy.value = null
  sortingSheetOpen.value = false
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

      <Transition name="slide-down">
        <section v-if="selectedProduct" class="mt-3">
          <FilterRow
            :filter30min="filter30min"
            :filter-top-rating="filterTopRating"
            :sort-by="sortBy"
            @toggle30min="toggle30min"
            @toggle-top-rating="toggleTopRating"
            @open-sorting="sortingSheetOpen = true"
          />
        </section>
      </Transition>

      <Transition name="slide-down">
        <section v-if="selectedProduct" class="mt-4 pb-8">
          <div v-if="producersStore.loading" class="flex justify-center py-8">
            <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <ProducerList
            v-else
            :producers="visibleProducers"
            @reset="handleReset"
          />
        </section>
      </Transition>
    </main>

    <SortingBottomSheet
      :open="sortingSheetOpen"
      :current-sort="sortBy"
      @apply="handleApplySort"
      @reset="handleResetSort"
      @close="sortingSheetOpen = false"
    />
  </div>
</template>
