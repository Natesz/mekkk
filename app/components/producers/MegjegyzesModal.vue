<script setup lang="ts">
const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{
  back: []
  closeAll: []
}>()

const cartStore = useCartStore()
const localNote = ref('')

watch(() => props.open, (val) => {
  if (val) localNote.value = cartStore.note
})

function saveAndBack() {
  cartStore.note = localNote.value
  emit('back')
}

function closeAll() {
  cartStore.note = localNote.value
  emit('closeAll')
}
</script>

<template>
  <Transition name="slide-right">
    <div
      v-if="open"
      class="fixed inset-0 bg-white z-60 flex flex-col"
    >
      <!-- Top bar -->
      <div class="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          @click="saveAndBack"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          @click="closeAll"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content (45% of screen height) -->
      <div class="px-5 pt-4 pb-6" style="min-height: 45vh">
        <h2 class="text-xl font-bold text-gray-900 mb-2">Megjegyzés írása</h2>
        <p class="text-sm text-gray-500 leading-relaxed mb-5">
          A megjegyzésedet megosztjuk a partnereinkkel, akik elkészítik és kiszállítják a rendelésed. :)
        </p>
        <textarea
          v-model="localNote"
          rows="6"
          placeholder="Üzenet az étteremnek..."
          class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- Kész button -->
      <div class="px-5 pb-8 flex-shrink-0">
        <button
          class="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold text-sm"
          @click="saveAndBack"
        >
          Kész
        </button>
      </div>
    </div>
  </Transition>
</template>
