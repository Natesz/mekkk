<script setup lang="ts">
defineProps<{
  breadcrumbs?: { label: string; to?: string }[]
}>()
</script>

<template>
  <header class="px-4 pt-4 pb-2">
    <img src="/pictures/logo4.png" alt="MEKKK" class="h-10 object-contain" />
    <nav v-if="breadcrumbs?.length" class="flex items-center gap-1 mt-1 text-sm text-gray-500">
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
</template>
