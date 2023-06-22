<template>
    <div>
        <div class="flex justify-center mt-10 mb-10">
          <h1 class="font-semibold leading-6 text-gray-900">Active Routes</h1>
        </div>
        <div class="mt-20">
          <div class="flex justify-center">
            <ul role="list" class="divide-y divide-gray-100 w-1/2">
              <li v-for="route in data.routes" :key="route.id" class="flex justify-between gap-x-6 py-5">
                <div class="flex gap-x-4">
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-gray-900">{{ route.start }} - {{ route.destination }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">Distance: {{ route.distance }}km</p>
                    <p class="text-sm leading-6 text-gray-900">{{ route.departureDate }} - {{ route.arrivalDate }}</p>
                    <p class="text-sm leading-6 text-gray-900">Revenue: {{ route.expectedRevenue }}$</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">ID: {{ route.id }}</p>
                  </div>
                </div>
                <div class="hidden sm:flex sm:flex-col sm:items-end">
                  <p class="text-sm font-semibold leading-6 text-gray-900">{{ route.truck.numberPlate }}</p>
                  <p class="text-sm leading-6 text-gray-900">Model: {{ route.truck.model }}</p>
                  <p class="text-sm leading-6 text-gray-900">Truck Type: {{ route.truck.type }}</p>
                  <p class="text-sm leading-6 text-gray-900">Mileage: {{ route.truck.mileage }} km</p> 
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">ID: {{ route.truck.id }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script setup>
  const { data } = await useFetch('/api/routes?bind=trucks&status=in-progress')
</script>
  