<script setup lang="ts">
useHead({ title: 'Kecskesajt készítése – MEKKK' })

const steps = [
  { step: '1', title: 'Tej begyűjtése', desc: 'A friss kecsketejet a fejést követően azonnal lehűtik, hogy megőrizzék minőségét.' },
  { step: '2', title: 'Oltás', desc: 'Hagyományos oltóanyaggal vagy tejsavbaktériummal indítják meg az alvadást.' },
  { step: '3', title: 'Alvadék vágása', desc: 'Az alvadt tömeget felvágják, hogy elválasszák a savótól. A szem mérete befolyásolja az állagot.' },
  { step: '4', title: 'Formázás', desc: 'Az alvadékot kézzel formázzák vagy sajtformákba töltik, majd lecsepegtetik.' },
  { step: '5', title: 'Sózás', desc: 'Száraz só vagy sós lé segítségével ízesítik és tartósítják a sajtot.' },
  { step: '6', title: 'Érlelés', desc: 'Néhány naptól több hétig tartó érlelési folyamat alatt alakul ki a végső íz és állag.' },
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Kecskesajt' }, { label: 'Készítés' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Hogyan készül a kecskesajt?</h1>
      <p class="text-gray-500 text-sm mb-6">A kézműves sajtgyártás hat alapvető lépése.</p>
      <div class="flex flex-col gap-4">
        <div
          v-for="s in steps"
          :key="s.step"
          class="flex gap-4 items-start"
        >
          <div class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {{ s.step }}
          </div>
          <div>
            <p class="font-semibold text-gray-900 text-sm">{{ s.title }}</p>
            <p class="text-gray-500 text-sm mt-0.5">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
