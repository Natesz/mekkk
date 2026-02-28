<script setup lang="ts">
useHead({ title: 'Kecskesajt típusok – MEKKK' })

const types = [
  { label: 'Sós', desc: 'A legelterjedtebb alaptípus. Friss, enyhén sós ízvilág, krémes állag.' },
  { label: 'Édes', desc: 'Mézzel vagy gyümölcsökkel ízesített változat, desszertnek is kiváló.' },
  { label: 'Füstölt', desc: 'Bükkfán vagy gyümölcsfán füstölt, intenzív aromájú sajt.' },
  { label: 'Kapros', desc: 'Friss kaporral ízesített, nyárias, könnyű ízprofil.' },
  { label: 'Borsos', desc: 'Fekete borssal fűszerezett, enyhén pikáns változat.' },
  { label: 'Csípős', desc: 'Erős paprikával vagy chilivivel ízesített, bátrabb ízvilág.' },
  { label: 'Garnélás', desc: 'Mediterrán ihletű, garnélarákkal kombinált különlegesség.' },
  { label: 'Paradicsmos', desc: 'Szárított paradicsommal készített, gazdagon ízesített változat.' },
  { label: 'Spenótos', desc: 'Friss vagy párolt spenóttal kevert, zöldes árnyalatú sajt.' },
  { label: 'Házi', desc: 'Egyszerű, natúr receptúra, minimális adalékanyaggal.' },
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Kecskesajt' }, { label: 'Típusok' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Kecskesajt típusok</h1>
      <p class="text-gray-500 text-sm mb-6">A MEKKK platformon elérhető kézműves kecskesajt változatok.</p>
      <div class="flex flex-col gap-3">
        <div
          v-for="t in types"
          :key="t.label"
          class="rounded-2xl border border-gray-100 px-4 py-3 bg-white shadow-sm"
        >
          <p class="font-semibold text-gray-900 text-sm">{{ t.label }}</p>
          <p class="text-gray-500 text-sm mt-0.5">{{ t.desc }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
