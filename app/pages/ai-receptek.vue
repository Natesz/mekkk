<script setup lang="ts">
useHead({ title: 'AI receptek – MEKKK' })

const productsStore = useProductsStore()
const { products, loading: productsLoading } = storeToRefs(productsStore)

const selectedIds = ref<string[]>([])
const isGenerating = ref(false)
const generatingStep = ref<'recipe' | 'image' | null>(null)
const error = ref<string | null>(null)

interface Recipe {
  title: string
  description: string
  steps: string[]
}

const recipe = ref<Recipe | null>(null)
const imageUrl = ref<string | null>(null)
const imageLoaded = ref(false)

onMounted(() => {
  productsStore.fetchProducts()
})

const canGenerate = computed(() => selectedIds.value.length > 0)
const selectedProducts = computed(() => products.value.filter(p => selectedIds.value.includes(p.id)))

function toggleProduct(id: string) {
  const idx = selectedIds.value.indexOf(id)
  if (idx !== -1) {
    selectedIds.value.splice(idx, 1)
  } else if (selectedIds.value.length < 3) {
    selectedIds.value.push(id)
  }
}

function isSelected(id: string) {
  return selectedIds.value.includes(id)
}

function isDisabled(id: string) {
  return selectedIds.value.length >= 3 && !selectedIds.value.includes(id)
}

async function generateRecipe() {
  if (!canGenerate.value || isGenerating.value) return

  isGenerating.value = true
  recipe.value = null
  imageUrl.value = null
  imageLoaded.value = false
  error.value = null

  try {
    const productNames = selectedProducts.value.map(p => p.name)

    generatingStep.value = 'recipe'
    const result = await $fetch<Recipe>('/api/generate-recipe', {
      method: 'POST',
      body: { products: productNames },
    })
    recipe.value = result

    generatingStep.value = 'image'
    const imageResult = await $fetch<{ url: string }>('/api/generate-recipe-image', {
      method: 'POST',
      body: { recipeTitle: result.title },
    })
    imageUrl.value = imageResult.url
  } catch {
    error.value = 'Nem sikerült generálni a receptet. Kérjük, próbáld újra.'
  } finally {
    isGenerating.value = false
    generatingStep.value = null
  }
}

const loadingText = computed(() => {
  if (generatingStep.value === 'recipe') return 'Recept generálása...'
  if (generatingStep.value === 'image') return 'Ételfotó készítése...'
  return 'Generálás...'
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader :breadcrumbs="[{ label: 'Főoldal', to: '/' }, { label: 'AI receptek' }]" />

    <main class="px-4 py-6 max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 leading-none">AI receptek</h1>
          <p class="text-green-600 text-sm mt-0.5 font-medium">Kecskesajtos inspiráció</p>
        </div>
      </div>

      <!-- Product selection -->
      <p class="text-sm font-semibold text-gray-700 mb-3">
        Válassz maximum 3 kecskesajtot
        <span v-if="selectedIds.length > 0" class="text-green-600">({{ selectedIds.length }}/3 kiválasztva)</span>
      </p>

      <div v-if="productsLoading" class="flex justify-center py-8">
        <div class="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>

      <div
        v-else
        class="grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-4"
      >
        <button
          v-for="product in products"
          :key="product.id"
          class="relative rounded-2xl border-2 overflow-hidden text-left transition-all duration-200 active:scale-[0.98]"
          :class="[
            isSelected(product.id) ? 'border-green-600 shadow-md' : 'border-gray-100 shadow-sm',
            isDisabled(product.id) ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-md cursor-pointer',
          ]"
          :disabled="isDisabled(product.id)"
          @click="toggleProduct(product.id)"
        >
          <div class="w-full h-20 sm:h-28 lg:h-36 overflow-hidden bg-green-50">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
          </div>

          <div v-if="isSelected(product.id)" class="absolute top-1.5 right-1.5 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div class="px-2 py-1.5 sm:px-3 sm:py-2">
            <p class="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2">{{ product.name }}</p>
          </div>
        </button>
      </div>

      <!-- Generate button -->
      <button
        class="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
        :class="canGenerate && !isGenerating
          ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.99]'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
        :disabled="!canGenerate || isGenerating"
        @click="generateRecipe"
      >
        <span v-if="isGenerating" class="flex items-center justify-center gap-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {{ loadingText }}
        </span>
        <span v-else>Recept generálása</span>
      </button>

      <!-- Error -->
      <div v-if="error" class="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
        <p class="text-red-600 text-sm">{{ error }}</p>
      </div>

      <!-- Recipe result -->
      <Transition name="slide-down">
        <div v-if="recipe" class="mt-6">
          <!-- Food image -->
          <div class="w-full rounded-2xl overflow-hidden mb-5" style="aspect-ratio: 16/9">
            <div v-if="!imageUrl || !imageLoaded" class="w-full h-full bg-gray-100 animate-pulse rounded-2xl" />
            <img
              v-if="imageUrl"
              :src="imageUrl"
              :alt="recipe.title"
              class="w-full h-full object-cover transition-opacity duration-500"
              :class="imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'"
              @load="imageLoaded = true"
            />
          </div>

          <h2 class="text-xl font-bold text-gray-900 mb-2">{{ recipe.title }}</h2>
          <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ recipe.description }}</p>

          <!-- Steps -->
          <h3 class="text-base font-semibold text-gray-800 mb-3">Elkészítés</h3>
          <ol class="space-y-3 mb-8">
            <li
              v-for="(step, i) in recipe.steps"
              :key="i"
              class="flex items-start gap-3"
            >
              <span class="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {{ i + 1 }}
              </span>
              <p class="text-sm text-gray-700 leading-relaxed">{{ step }}</p>
            </li>
          </ol>

          <button
            class="w-full py-3 rounded-xl border border-green-600 text-green-600 font-semibold text-sm hover:bg-green-50 transition-colors"
            @click="generateRecipe"
          >
            Új recept generálása
          </button>
        </div>
      </Transition>
    </main>
  </div>
</template>
