<script setup lang="ts">
useHead({ title: 'AI receptek – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'AI receptek' }]" />
    <main class="px-4 py-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 leading-none">AI receptek</h1>
          <p class="text-green-600 text-sm mt-0.5 font-medium">Kecskesajtos inspiráció</p>
        </div>
      </div>

      <p class="text-gray-500 text-sm leading-relaxed mb-8">
        Válassz egy kecskesajt típust, és mesterséges intelligenciánk személyre szabott recepteket javasol hozzá.
        Hamarosan elérhető!
      </p>

      <!-- Placeholder cards -->
      <div class="flex flex-col gap-3">
        <div
          v-for="i in 3"
          :key="i"
          class="rounded-2xl border border-dashed border-gray-200 px-4 py-5 flex items-center gap-4 bg-gray-50"
        >
          <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-3 bg-gray-200 rounded-full animate-pulse w-3/4" />
            <div class="h-3 bg-gray-200 rounded-full animate-pulse w-1/2" />
          </div>
        </div>
      </div>

      <div class="mt-8 rounded-2xl bg-green-50 border border-green-100 px-5 py-4">
        <p class="text-green-700 text-sm font-medium">Fejlesztés alatt</p>
        <p class="text-green-600 text-xs mt-1 leading-relaxed">
          Ez a funkció hamarosan elérhető lesz. Az AI a kiválasztott kecskesajt típushoz fog recepteket generálni.
        </p>
      </div>
    </main>
  </div>
</template>
