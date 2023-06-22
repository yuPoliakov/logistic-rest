<template>
  <form @submit.prevent="() => emit('submit')" class="w-1/2 space-y-4">
    <div>Create New Truck</div>
    <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.numberPlate" placeholder="Number Plate" name="numberPlate" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.status" name="status" placeholder="Status" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.model" name="model" placeholder="Model" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.boughtDate" name="boughtDate" placeholder="Bought Date dd/mm/yyyy" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.mileage" name="mileage" placeholder="Mileage" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
      <div class="w-full px-2 md:w-1/2">
        <input v-model="modelValue.type" name="type" placeholder="Type" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"/>
      </div>
    </div>
    <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Submit</button>
  </form>
</template>

<script setup>
  defineProps(['modelValue']);
  const emit = defineEmits(['submit']);
</script>
