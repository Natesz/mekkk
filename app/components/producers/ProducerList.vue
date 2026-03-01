<script setup lang="ts">
import type { Producer } from '~/types/producer'

defineProps<{
  producers: Producer[]
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="px-4">
    <div class="flex items-center justify-between md:justify-start md:gap-4 mb-4">
      <p class="text-sm text-gray-700">
        <span class="font-semibold">{{ producers.length }}</span> találat
      </p>
      <button
        class="text-sm font-medium text-green-600 border border-green-600 bg-white rounded-full px-4 py-1.5 hover:bg-green-50 transition-colors"
        @click="emit('reset')"
      >
        Visszaállítás
      </button>
    </div>

    <TransitionGroup
      name="producer-list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ProducerCard
        v-for="producer in producers"
        :key="producer.id"
        :producer="producer"
      />
    </TransitionGroup>
  </div>
</template>
