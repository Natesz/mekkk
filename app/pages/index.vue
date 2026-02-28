<script setup lang="ts">
const productsStore = useProductsStore()
const producersStore = useProducersStore()

const { products, selectedProductId, selectedProduct } = storeToRefs(productsStore)

const {
  filter30min,
  filterTopRating,
  sortBy,
  sortingSheetOpen,
  applyFilters,
  reset: resetFilters,
} = useProducerFilters()

const rawProducers = computed(() =>
  selectedProduct.value
    ? producersStore.getByProductId(selectedProduct.value.id)
    : [],
)

const visibleProducers = computed(() => applyFilters(rawProducers.value))

function toggle30min() {
  filter30min.value = !filter30min.value
}

function toggleTopRating() {
  filterTopRating.value = !filterTopRating.value
}

function handleReset() {
  productsStore.resetSelection()
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
        <ProductCarousel
          :products="products"
          :selected-product-id="selectedProductId"
          @select="productsStore.selectProduct"
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
          <ProducerList
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
