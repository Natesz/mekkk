<script setup lang="ts">
useHead({ title: 'Kecskesajt története – MEKKK' })
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'Kecskesajt' }, { label: 'Története' }]" />
    <main class="px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">A kecskesajt története</h1>
      <div class="space-y-4 text-gray-600 leading-relaxed text-sm">
        <p>
          A kecskesajt az emberiség egyik legősibb élelmiszere. Közel-Keleten már több mint
          <strong class="text-gray-800">10 000 évvel ezelőtt</strong> háziasították a kecskéket,
          és tejükből sajtot készítettek.
        </p>
        <p>
          Az ókori Görögországban és Rómában a kecskesajt az étkezési kultúra szerves részét
          képezte – Homérosz is megemlíti az Odüsszeiában. Franciaországban a középkorban
          a Loire-völgy apátságai fejlesztették tovább a sajtolási technikákat.
        </p>
        <p>
          Magyarországon a kecsketartás és sajtkészítés hagyománya évszázadokra nyúlik vissza,
          különösen az alföldi és dombvidéki területeken. A kis gazdaságok kézműves sajtjai
          máig megőrizték az eredeti ízeket és receptúrákat.
        </p>
        <p>
          Ma a kézműves kecskesajt reneszánszát éli: egyre több kisgazdaság tér vissza
          a hagyományos módszerekhez, és egyre több vásárló keresi a helyi, természetes termékeket.
          A MEKKK ezen a kapcsolaton munkálkodik.
        </p>
      </div>
    </main>
  </div>
</template>
