<script setup lang="ts">
useHead({ title: 'Szabályzat – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Szabályzat' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Szabályzat</h1>
      <div class="space-y-5 text-gray-600 leading-relaxed">
        <section>
          <h2 class="text-base font-semibold text-gray-800 mb-1">Használati feltételek</h2>
          <p>A platform kizárólag személyes, nem kereskedelmi célú használatra engedélyezett. A tartalmak jogosulatlan másolása tilos.</p>
        </section>
        <section>
          <h2 class="text-base font-semibold text-gray-800 mb-1">Termelői feltételek</h2>
          <p>A termelők vállalják, hogy az általuk megadott adatok valósak, termékeik megfelelnek az érvényes élelmiszerbiztonsági előírásoknak.</p>
        </section>
        <section>
          <h2 class="text-base font-semibold text-gray-800 mb-1">Adatkezelés</h2>
          <p>A megadott személyes adatokat kizárólag a rendelés teljesítéséhez használjuk fel, harmadik félnek nem adjuk át.</p>
        </section>
        <section>
          <h2 class="text-base font-semibold text-gray-800 mb-1">Felelősség</h2>
          <p>A MEKKK platform közvetítőként működik, a termékek minőségéért a termelők felelnek.</p>
        </section>
      </div>
    </main>
  </div>
</template>
