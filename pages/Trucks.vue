<template>
  <div>
    <div class="flex justify-center mt-10 mb-10">
      <h1 class="font-semibold leading-6 text-gray-900">All Trucks</h1>
    </div>
    <div v-if="errorMsg" class="error bg-red-300">{{ errorMsg }}</div>
    <div class="flex justify-center">
      <ul role="list" class="divide-y divide-gray-100 w-1/2">
        <li v-for="truck in data.trucks" :key="truck.id" class="flex justify-between gap-x-6 py-5">
          <div class="flex gap-x-4">
            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ truck.numberPlate }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ truck.model }}</p>
              <p class="text-sm leading-6 text-gray-900">Bought Date: {{ truck.boughtDate }}</p>
              <p class="text-sm leading-6 text-gray-900">Truck Type: {{ truck.type }}</p>
              <p class="text-sm leading-6 text-gray-900">Mileage: {{ truck.mileage }}km</p>
              <div class="mt-1 flex items-center gap-x-1.5">
                <div :class="`flex-none rounded-full ${statusColorMapping[truck.status]}/20 p-1`">
                  <div :class="`h-1.5 w-1.5 rounded-full ${statusColorMapping[truck.status]}`" />
                </div>
                <p class="text-xs leading-5 text-gray-500">{{ truck.status }}</p>
              </div>
            </div>
          </div>
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">ID: {{ truck.id }}</p>
            <div class="mt-2 flex items-center gap-x-3">
              <button @click="showUpdatingModal" :data-id="truck.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
            </div>
            <div class="mt-2 flex items-center gap-x-3">
              <button @click="deleteTruck" :data-id="truck.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Delete</button>
            </div>
            <div v-if="truck.status === 'free'">
              <div class="mt-2 flex items-center gap-x-3">
                <input name="'route-id-' + truck.id" :class="`route-id-${truck.id} w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline`" type="text" placeholder="Assign route to this truck"/>
                <button @click="assignToRoute" :data-id="truck.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Assign</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Create new Truck Form -->
    <div class="flex justify-center mt-20 mb-20">
      <CreateTruckForm v-model="newTruckForm" @submit="createNewTruck"/>
    </div>

    <client-only>
      <Modal v-model:visible="isUpdateModalVisible" :title="'Change a truck'" :okButton="{text: 'Submit', onclick: handleUpdate}">
        <UpdateTruckForm v-model="updateForm"/>
      </Modal>
    </client-only>
  </div>
</template>

<script setup>
  import { Modal } from 'usemodal-vue3';
  import { reactive } from 'vue';
  import UpdateTruckForm from '../components/UpdateTruckForm.vue';
  import CreateTruckForm from '../components/CreateTruckForm.vue';

  const { data } = await useFetch('/api/trucks');
  const errorMsg = ref('');
  const isUpdateModalVisible = ref(false);
  const updateForm = reactive({
    numberPlate: '',
    status: '',
    model: '',
    boughtDate: '',
    mileage: '',
    type: ''
  });
  const newTruckForm = reactive({
    numberPlate: '',
    status: '',
    model: '',
    boughtDate: '',
    mileage: '',
    type: ''
  });
  const statusColorMapping = {
    free: 'bg-emerald-500',
    busy: 'bg-yellow-500'
  }

  let updatingId = '';

  function showUpdatingModal($el) {
    isUpdateModalVisible.value = true;
    updatingId = $el?.srcElement?.dataset?.id;

    const editingTrucks = data.value.trucks.find((truck) => {
      return truck.id === updatingId;
    });

    Object.keys(updateForm).forEach((field) => {
      updateForm[field] = editingTrucks[field];
    });
  }

  async function handleUpdate() {
    await updateTruck(null, {...updateForm, id: updatingId});
    isUpdateModalVisible.value = false;
    updatingId = '';
  }

  async function createNewTruck() {
    const response = await useFetch('/api/trucks/', {
        method: 'POST',
        body: {
            ...newTruckForm
        }
    });

    if (response.data.value.truck) {
        data.value.trucks = [...data.value.trucks, response.data.value.truck];

        Object.keys(newTruckForm).forEach((field) => {
          newTruckForm[field] = '';
        });

        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function updateTruck($el, body = {}) {
    const truckId = $el?.srcElement?.dataset?.id || body.id;

    if (!truckId) {
      return;
    }

    const response = await useFetch(`/api/trucks/${truckId}`, {
        method: 'PUT',
        body: {
            ...body
        }
    });

    if (response.data.value.truck) {
        data.value.trucks = data.value.trucks.map((truck) => {
            if (truck.id !== truckId) {
                return truck;
            }

            return response.data.value.truck;
        });
        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function deleteTruck($el) {
    const truckId = $el.srcElement.dataset.id;
    const response = await useFetch(`/api/trucks/${truckId}`, {
        method: 'DELETE'
    });

    if (response.data.value.truck) {
        data.value.trucks = data.value.trucks.filter((truck) => {
            return truck.id !== truckId;
        });

        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function assignToRoute($el) {
    const truckId = $el.srcElement.dataset.id;
    const routeId = $el.srcElement.parentElement.querySelector(`.route-id-${truckId}`).value

    const response = await useFetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        body: {
            truckId
        }
    });

    if (!response.data.value.error) {
        data.value.trucks = data.value.trucks.map((truck) => {
            if (truck.id !== truckId) {
                return truck;
            }

            return response.data.value.truck;
        });

        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  function handleError(msg = '') {
    errorMsg.value = msg;
  }

</script>
  