<template>
  <form class="w-1/2 space-y-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.numberPlate" placeholder="Number Plate" name="numberPlate" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.status" name="status" placeholder="Status" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.model" name="model" placeholder="Model" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.boughtDate" name="boughtDate" placeholder="Bought Date" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.mileage" name="mileage" placeholder="Mileage" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <input v-model="modelValue.type" name="type" placeholder="Type" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
  </form>
</template>
  
  <script setup>
    defineProps(['modelValue']);
  </script>
  