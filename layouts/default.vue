<template>
  <div>
    <header class="border-b">
      <nav class="mx-auto flex max-w-7xl items-center justify-center p-6 px-8" aria-label="Global">
        <div class="flex gap-x-12">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"><NuxtLink to="/">Home</NuxtLink></a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"><NuxtLink to="/routes">Routes</NuxtLink></a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"><NuxtLink to="/trucks">Trucks</NuxtLink></a>
        </div>
      </nav>
    </header>
    <div>
      <slot/>
    </div>
  </div>
</template>