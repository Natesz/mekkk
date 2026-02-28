<script setup lang="ts">
useHead({ title: 'Rólunk – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Rólunk' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Rólunk</h1>
      <p class="text-gray-600 leading-relaxed mb-4">
        A MEKKK platform célja, hogy összehozza a kézműves kecskesajt termelőket és a vásárlókat.
        Hisszük, hogy a minőségi, helyi termékek megérdemlik a figyelmet – és egy közvetlen csatornát
        a gazdától az asztalig.
      </p>
      <p class="text-gray-600 leading-relaxed mb-4">
        Platformunkon keresztül könnyen megtalálhatod a hozzád legközelebb lévő termelőket,
        böngészheted a sajttípusokat, és közvetlenül rendelhetsz a gazdaságoktól.
      </p>
      <p class="text-gray-600 leading-relaxed">
        Csapatunk szenvedélyes hívője a lassú élelmiszereknek, az átlátható termelésnek
        és a helyi gazdaságok támogatásának.
      </p>
    </main>
  </div>
</template>
