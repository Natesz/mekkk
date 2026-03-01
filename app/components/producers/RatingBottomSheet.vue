<script setup lang="ts">
const props = defineProps<{
  open: boolean
  currentThreshold: number | null
}>()

const emit = defineEmits<{
  apply: [threshold: number]
  reset: []
  close: []
}>()

const steps = [3, 3.5, 4, 4.5, 5]
const labels = ['3 felett', '3,5 felett', '4 felett', '4,5 felett', 'pontosan 5']

const localIndex = ref(0)

watch(() => props.open, (val) => {
  if (val) {
    const idx = props.currentThreshold !== null ? steps.indexOf(props.currentThreshold) : 0
    localIndex.value = idx >= 0 ? idx : 0
  }
})

function apply() {
  emit('apply', steps[localIndex.value])
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

        <p class="text-center text-base font-semibold text-gray-900 mb-6">Értékelés</p>

        <!-- Step labels -->
        <div class="flex justify-between mb-2 px-1">
          <span
            v-for="(label, i) in labels"
            :key="i"
            class="text-xs transition-colors duration-150"
            :class="localIndex === i ? 'text-green-600 font-semibold' : 'text-gray-400'"
          >
            {{ label }}
          </span>
        </div>

        <!-- Slider -->
        <input
          type="range"
          min="0"
          max="4"
          step="1"
          :value="localIndex"
          class="w-full accent-green-600 cursor-pointer mb-6"
          @input="localIndex = +($event.target as HTMLInputElement).value"
        />

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
          Visszaállít
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
