<script setup lang="ts">
useHead({ title: 'Termelőink – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Termelőink' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Termelőink</h1>
      <p class="text-gray-500 text-sm mb-6">
        Megbízható, ellenőrzött kézműves kecskesajt gazdaságok.
      </p>
      <div class="rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-green-800 text-sm">
        A termelőink teljes listája a főoldalon, a sajttípus kiválasztása után érhető el.
        Kattints egy sajttípusra a kezdőlapon, és megjelennek az ahhoz tartozó termelők!
      </div>
      <div class="mt-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          ← Vissza a főoldalra
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
