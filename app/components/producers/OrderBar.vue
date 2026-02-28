<script setup lang="ts">
const cartStore = useCartStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="cartStore.totalItems > 0"
        class="fixed bottom-0 inset-x-0 z-30 px-4 pb-6"
      >
        <div class="bg-green-600 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-xl">
          <div>
            <p class="text-white font-semibold text-sm">Rendelés megtekintése</p>
            <p class="text-white/70 text-xs mt-0.5">{{ cartStore.totalItems }} termék</p>
          </div>
          <p class="text-white font-bold text-base">
            {{ cartStore.totalPrice.toLocaleString('hu-HU') }} Ft
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
