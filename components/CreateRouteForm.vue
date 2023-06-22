<template>
    <form @submit.prevent="() => emit('submit')" class="w-1/2 space-y-4">
      <div>Create new Route</div>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.start" placeholder="Start" name="Start" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.destination" name="destination" placeholder="Destination" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      </div>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.distance" name="distance" placeholder="Distance" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.departureDate" name="departureDate" placeholder="Departure Date dd/mm/yyyy" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      </div>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <div class="w-full px-2 md:w-1/2">
            <input v-model="modelValue.arrivalDate" name="arrivalDate" placeholder="Arrival Date dd/mm/yyyy" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
        </div>
        <div class="w-full px-2 md:w-1/2">
            <input v-model="modelValue.requiredType" name="requiredType" placeholder="Required Truck Type" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.expectedRevenue" name="expectedRevenue" placeholder="Expected Revenue" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
          <input v-model="modelValue.status" name="status" placeholder="Status" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      </div>
      <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Create</button>
    </form>
  </template>
  
  <script setup>
    defineProps(['modelValue']);
    const emit = defineEmits(['submit']);
  </script>
  