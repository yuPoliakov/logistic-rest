<template>
  <form class="w-1/2 space-y-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.start" placeholder="Start" name="Start" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.destination" name="destination" placeholder="Destination" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.distance" name="distance" placeholder="Distance" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.departureDate" name="departureDate" placeholder="Departure Date" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.arrivalDate" name="arrivalDate" placeholder="Arrival Date" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.requiredType" name="requiredType" placeholder="Required Truck Type" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.expectedRevenue" name="expectedRevenue" placeholder="Expected Revenue" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.status" name="status" placeholder="Status" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.truckId" name="truckId" placeholder="Truck Id" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
  </form>
</template>
  
<script setup>
  defineProps(['modelValue']);
</script>
  