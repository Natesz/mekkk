<script setup lang="ts">
const cartStore = useCartStore()
const router = useRouter()

const notesOpen = ref(false)
const expandedItemId = ref<string | null>(null)
const directions = ref<Record<string, 'up' | 'down'>>({})

const hasItems = computed(() => cartStore.orderedItems.length > 0)

function close() {
  cartStore.rendelesedOpen = false
  expandedItemId.value = null
}

function closeAll() {
  notesOpen.value = false
  cartStore.rendelesedOpen = false
  expandedItemId.value = null
}

function toggleExpand(id: string) {
  expandedItemId.value = expandedItemId.value === id ? null : id
}

function handleIncrement(id: string) {
  directions.value[id] = 'up'
  cartStore.increment(id)
}

function handleDecrement(id: string) {
  directions.value[id] = 'down'
  cartStore.decrement(id)
  if (cartStore.getQuantity(id) === 0) expandedItemId.value = null
}

function handleRemove(id: string) {
  cartStore.removeProduct(id)
  expandedItemId.value = null
}

async function goToCheckout() {
  cartStore.rendelesedOpen = false
  await router.push('/penztar')
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="cartStore.rendelesedOpen"
        class="fixed inset-0 bg-black/40 z-40"
        @click="close"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide-right">
      <div
        v-if="cartStore.rendelesedOpen"
        class="fixed top-0 right-0 h-full bg-white z-50 w-full md:w-1/4 shadow-2xl flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-start justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <h2 class="text-xl font-bold text-gray-900 mt-0.5">Rendelésed</h2>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors flex-shrink-0"
            @click="close"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto">

          <!-- Empty state -->
          <div v-if="!hasItems" class="flex flex-col items-center justify-center h-full px-8 text-center">
            <p class="text-base font-semibold text-gray-800 mb-2">Nincsenek tételek a rendelésedben.</p>
            <p class="text-sm text-gray-400 italic">azt hitted erre a hibaágra nem gondolok.</p>
          </div>

          <!-- Product list + notes -->
          <div v-else class="px-5">
            <TransitionGroup name="producer-list" tag="div">
              <div
                v-for="item in cartStore.orderedItems"
                :key="item.id"
                class="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
              >
                <!-- Image -->
                <div class="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>

                <!-- Name + price -->
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">{{ item.name }}</p>
                  <p class="text-green-600 text-sm font-bold mt-0.5">{{ item.price.toLocaleString('hu-HU') }} Ft</p>
                </div>

                <!-- Quantity badge / expanded controls -->
                <div
                  class="flex items-center bg-green-600 rounded-full overflow-hidden transition-all duration-200 flex-shrink-0 cursor-pointer"
                  :style="{ width: expandedItemId === item.id ? '9.5rem' : '2rem', height: '2rem' }"
                  @click="toggleExpand(item.id)"
                >
                  <!-- Minus (expanded) -->
                  <button
                    v-if="expandedItemId === item.id"
                    class="w-8 h-8 flex items-center justify-center text-white font-bold text-xl leading-none flex-shrink-0"
                    @click.stop="handleDecrement(item.id)"
                  >
                    −
                  </button>

                  <!-- Counter -->
                  <div class="flex-1 relative overflow-hidden flex items-center justify-center" style="height: 1.25rem">
                    <Transition :name="`count-${directions[item.id] ?? 'up'}`">
                      <span
                        :key="item.quantity"
                        class="block text-white font-bold text-xs leading-5 text-center"
                      >
                        {{ item.quantity }}
                      </span>
                    </Transition>
                  </div>

                  <!-- Plus (expanded) -->
                  <button
                    v-if="expandedItemId === item.id"
                    class="w-8 h-8 flex items-center justify-center text-white font-bold text-xl leading-none flex-shrink-0"
                    @click.stop="handleIncrement(item.id)"
                  >
                    +
                  </button>

                  <!-- Trash (expanded) -->
                  <button
                    v-if="expandedItemId === item.id"
                    class="w-8 h-8 flex items-center justify-center text-white flex-shrink-0"
                    @click.stop="handleRemove(item.id)"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </TransitionGroup>

            <!-- Notes row -->
            <button
              class="w-full flex items-center justify-between py-4 mt-1"
              @click="notesOpen = true"
            >
              <span class="text-sm text-gray-600 truncate flex-1 text-left">
                {{ cartStore.note || 'Megjegyzések' }}
              </span>
              <span class="flex-shrink-0 ml-3">
                <svg
                  v-if="!cartStore.note"
                  class="w-5 h-5 text-green-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-gray-400"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- Bottom button -->
        <div class="px-5 pb-8 pt-3 flex-shrink-0">
          <button
            v-if="hasItems"
            class="w-full py-4 bg-green-600 text-white rounded-2xl font-semibold flex items-center justify-between px-5 active:scale-[0.99] transition-transform"
            @click="goToCheckout"
          >
            <span class="text-sm font-bold bg-green-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              {{ cartStore.totalItems }}
            </span>
            <span class="text-sm font-bold">Pénztárhoz</span>
            <span class="text-sm font-bold">{{ cartStore.totalPrice.toLocaleString('hu-HU') }} Ft</span>
          </button>
          <button
            v-else
            class="w-full py-4 bg-green-600 text-white rounded-2xl font-semibold text-sm active:scale-[0.99] transition-transform"
            @click="close"
          >
            Tételek hozzáadása
          </button>
        </div>
      </div>
    </Transition>

    <!-- Notes modal (z-60, on top of drawer) -->
    <MegjegyzesModal
      :open="notesOpen"
      @back="notesOpen = false"
      @close-all="closeAll"
    />
  </Teleport>
</template>
