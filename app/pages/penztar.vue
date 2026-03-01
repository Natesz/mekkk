<script setup lang="ts">
useHead({ title: 'Pénztár – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Pénztár' }]" />

    <main class="px-4 py-10 max-w-lg mx-auto flex flex-col items-center text-center">
      <div class="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
        <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Pénztár</h1>
      <p class="text-sm text-gray-500 leading-relaxed mb-8">
        A fizetési folyamat hamarosan elérhető lesz. Köszönjük a türelmed!
      </p>

      <NuxtLink
        to="/"
        class="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors active:scale-[0.99]"
      >
        Vissza a főoldalra
      </NuxtLink>
    </main>
  </div>
</template>
