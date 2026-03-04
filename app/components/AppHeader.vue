<script setup lang="ts">
defineProps<{
  breadcrumbs?: { label: string; to?: string }[]
}>()

const menuOpen = ref(false)

watch(menuOpen, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})
</script>

<template>
  <header class="px-4 pt-4 pb-2">
    <!-- Top row: hamburger | logo | profile -->
    <div class="flex items-center justify-between">
      <!-- Hamburger button -->
      <button
        class="flex flex-col justify-center gap-[5px] w-9 h-9 focus:outline-none"
        aria-label="Menü megnyitása"
        @click="menuOpen = true"
      >
        <span class="block w-6 h-[3px] rounded-full bg-green-600" />
        <span class="block w-6 h-[3px] rounded-full bg-green-600" />
        <span class="block w-6 h-[3px] rounded-full bg-green-600" />
      </button>

      <!-- Logo (center) -->
      <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2">
        <img src="/pictures/logo4.png" alt="MEKKK" class="h-10 object-contain" style="clip-path: circle(48%)" />
      </NuxtLink>

      <!-- Cart icon (right) -->
      <NuxtLink
        to="/korabbi-rendeleseim"
        class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
        aria-label="Korábbi rendeléseim"
      >
        <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Breadcrumbs -->
    <nav v-if="breadcrumbs?.length" class="flex items-center gap-1 mt-2 text-sm text-gray-500">
      <template v-for="(crumb, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" class="text-gray-300 mx-1">/</span>
        <NuxtLink
          v-if="crumb.to"
          :to="crumb.to"
          class="hover:text-green-600 transition-colors"
        >{{ crumb.label }}</NuxtLink>
        <span v-else class="text-gray-700 font-medium">{{ crumb.label }}</span>
      </template>
    </nav>
  </header>

  <HamburgerMenu :open="menuOpen" @close="menuOpen = false" />
</template>
