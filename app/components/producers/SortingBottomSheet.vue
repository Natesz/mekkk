<script setup lang="ts">
const props = defineProps<{
  open: boolean
  currentSort: 'rating' | 'arrival' | null
}>()

const emit = defineEmits<{
  apply: [sort: 'rating' | 'arrival' | null]
  reset: []
  close: []
}>()

const localSort = ref<'rating' | 'arrival' | null>(null)

watch(() => props.open, (val) => {
  if (val) localSort.value = props.currentSort
})

function apply() {
  emit('apply', localSort.value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/30 z-40"
        @click="emit('close')"
      />
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="open"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 px-5 pt-4 pb-8"
        style="max-height: 50vh"
      >
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <p class="text-center text-base font-semibold text-gray-900 mb-5">Rendezés</p>

        <div class="flex flex-col gap-4 mb-6">
          <button
            class="flex items-center gap-3 w-full"
            @click="localSort = 'rating'"
          >
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
              :class="localSort === 'rating' ? 'border-green-600' : 'border-gray-300'"
            >
              <div
                v-if="localSort === 'rating'"
                class="w-2.5 h-2.5 rounded-full bg-green-600"
              />
            </div>
            <span class="text-sm text-gray-800">Értékelés alapján</span>
          </button>

          <button
            class="flex items-center gap-3 w-full"
            @click="localSort = 'arrival'"
          >
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
              :class="localSort === 'arrival' ? 'border-green-600' : 'border-gray-300'"
            >
              <div
                v-if="localSort === 'arrival'"
                class="w-2.5 h-2.5 rounded-full bg-green-600"
              />
            </div>
            <span class="text-sm text-gray-800">Legkorábbi érkezés</span>
          </button>
        </div>

        <button
          class="w-full py-3 bg-green-600 text-white font-semibold rounded-xl text-sm mb-3"
          @click="apply"
        >
          Alkalmaz
        </button>
        <button
          class="w-full py-3 bg-white text-green-600 font-semibold rounded-xl text-sm border border-green-600"
          @click="emit('reset')"
        >
          Visszaállítás
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
