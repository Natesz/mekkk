<script setup lang="ts">
const productsStore = useProductsStore()
const producersStore = useProducersStore()

const { products, selectedProductId, selectedProduct } = storeToRefs(productsStore)

const visibleProducers = computed(() =>
  selectedProduct.value
    ? producersStore.getByProductId(selectedProduct.value.id)
    : []
)
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
          @reset="productsStore.resetSelection"
        />
      </section>

      <Transition name="slide-down">
        <section v-if="selectedProduct" class="mt-6">
          <ProducerList :producers="visibleProducers" />
        </section>
      </Transition>
    </main>
  </div>
</template>
