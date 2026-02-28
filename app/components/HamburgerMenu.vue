<script setup lang="ts">
defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const router = useRouter()

function navigate(path: string) {
  router.push(path)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <!-- Dim overlay -->
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/40"
        @click="emit('close')"
      />
    </Transition>

    <!-- Left panel -->
    <Transition name="slide-left">
      <div
        v-if="open"
        class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <NuxtLink to="/" @click="emit('close')">
            <img src="/pictures/logo4.png" alt="MEKKK" class="h-8 object-contain" />
          </NuxtLink>
          <button
            class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            @click="emit('close')"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col px-5 pt-5 gap-1 flex-1">
          <button
            class="text-left py-3 px-3 rounded-xl text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/rolunk')"
          >
            Rólunk
          </button>
          <button
            class="text-left py-3 px-3 rounded-xl text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/szabalyzat')"
          >
            Szabályzat
          </button>
          <button
            class="text-left py-3 px-3 rounded-xl text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/termeloink')"
          >
            Termelőink
          </button>

          <!-- Separator -->
          <div class="mt-3 mb-2">
            <div class="h-px bg-gray-100" />
            <p class="mt-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Kecskesajt
            </p>
          </div>

          <button
            class="text-left py-3 px-3 rounded-xl text-gray-700 text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/kecskesajt/tipusok')"
          >
            Típusok
          </button>
          <button
            class="text-left py-3 px-3 rounded-xl text-gray-700 text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/kecskesajt/keszites')"
          >
            Készítés
          </button>
          <button
            class="text-left py-3 px-3 rounded-xl text-gray-700 text-base hover:bg-green-50 hover:text-green-700 transition-colors"
            @click="navigate('/kecskesajt/tortenete')"
          >
            Története
          </button>

          <!-- AI receptek section -->
          <div class="mt-3 mb-2">
            <div class="h-px bg-gray-100" />
          </div>

          <button
            class="text-left py-3 px-3 rounded-xl text-green-600 font-semibold text-lg hover:bg-green-50 transition-colors flex items-center gap-2"
            @click="navigate('/ai-receptek')"
          >
            <svg class="w-5 h-5 flex-shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            AI receptek
          </button>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
