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
        <img src="/pictures/logo4.png" alt="MEKKK" class="h-10 object-contain" />
      </NuxtLink>

      <!-- Profile icon (right, functionless) -->
      <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </div>
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
