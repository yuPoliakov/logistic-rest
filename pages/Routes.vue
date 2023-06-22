<template>
    <div>
      <div class="flex justify-center mt-10 mb-10">
        <h1 class="font-semibold leading-6 text-gray-900">All Routes</h1>
      </div>
      <div v-if="errorMsg" class="error bg-red-300">{{ errorMsg }}</div>
      <div class="flex justify-center">
        <ul role="list" class="divide-y divide-gray-100 w-1/2">
          <li v-for="route in data.routes" :key="route.id" class="flex justify-between gap-x-6 py-5">
            <div class="flex gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ route.start }} - {{ route.destination }}</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ route.distance }}km</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">ID: {{ route.id }}</p>
              </div>
            </div>
            <div class="hidden sm:flex sm:flex-col sm:items-end">
              <p class="text-sm leading-6 text-gray-900">{{ route.departureDate }} - {{ route.arrivalDate }}</p>
              <p class="text-sm leading-6 text-gray-900">Required Truck Type: {{ route.requiredType }}</p>
              <p class="text-sm leading-6 text-gray-900">Revenue: {{ route.expectedRevenue }}$</p>
              <p v-if="route.truckId" class="text-sm leading-6 text-gray-900">TruckId: {{ route.truckId }}</p>
              <div class="mt-1 flex items-center gap-x-1.5">
                <div :class="`flex-none rounded-full ${statusColorMapping[route.status]}/20 p-1`">
                  <div :class="`h-1.5 w-1.5 rounded-full ${statusColorMapping[route.status]}`" />
                </div>
                <p class="text-xs leading-5 text-gray-500">{{ route.status }}</p>
              </div>
              <div class="mt-2 flex items-center gap-x-3">
                <button @click="showUpdatingModal" :data-id="route.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
              </div>
              <div class="mt-2 flex items-center gap-x-3">
                <button @click="deleteRoute" :data-id="route.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Delete</button>
              </div>
              <div v-if="route.status === 'waiting'">
                <div class="mt-2 flex items-center gap-x-3">
                  <input name="'route-id-' + route.id" :class="`truck-id-${route.id} w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline`" type="text" placeholder="Assign truck to this route"/>
                  <button @click="assignTruck" :data-id="route.id" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Assign</button>
                </div>
              </div> 
            </div>
          </li>
        </ul>
      </div>
      <client-only>
        <Modal v-model:visible="isUpdateModalVisible" :title="'Change a route'" :okButton="{text: 'Submit', onclick: handleUpdate}">
          <UpdateRouteForm v-model="updateForm"/>
        </Modal>
      </client-only>
      <div class="flex justify-center mt-20 mb-20">
        <CreateRouteForm v-model="newRouteForm" @submit="createNewRoute"/>
      </div>
    </div>
</template>

<script setup>
  import { Modal } from 'usemodal-vue3';
  import { reactive } from 'vue';
  import CreateRouteForm from '../components/CreateRouteForm.vue';
  import UpdateRouteForm from '../components/UpdateRouteForm.vue';

  const { data } = await useFetch('/api/routes');
  const errorMsg = ref('');
  const isUpdateModalVisible = ref(false);
  const updateForm = reactive({
    start: '',
    destination: '',
    distance: '',
    departureDate: '',
    arrivalDate: '',
    requiredType: '',
    expectedRevenue: '',
    truckId: '',
    status: ''
  });
  const newRouteForm = reactive({
    start: '',
    destination: '',
    distance: '',
    departureDate: '',
    arrivalDate: '',
    requiredType: '',
    expectedRevenue: '',
    truckId: '',
    status: ''
  });
  const statusColorMapping = {
    'in-progress': 'bg-emerald-500',
    waiting: 'bg-gray-500',
    done: 'bg-blue-700',
  };

  let updatingId = '';

  function showUpdatingModal($el) {
    isUpdateModalVisible.value = true;
    updatingId = $el?.srcElement?.dataset?.id;

    const editingRoute = data.value.routes.find((route) => {
      return route.id === updatingId;
    });

    Object.keys(updateForm).forEach((field) => {
      updateForm[field] = editingRoute[field];
    });
  }

  async function handleUpdate() {
    await updateRoute(null, {...updateForm, id: updatingId});
    isUpdateModalVisible.value = false;
    updatingId = '';
  }

  async function createNewRoute() {
    const response = await useFetch('/api/routes/', {
        method: 'POST',
        body: {
            ...newRouteForm
        }
    });

    if (response.data.value.route) {
        data.value.routes = [...data.value.routes, response.data.value.route];

        Object.keys(newRouteForm).forEach((field) => {
          newRouteForm[field] = '';
        });

        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function updateRoute($el, body = {}) {
    const routeId = $el?.srcElement?.dataset?.id || body.id;

    if (!routeId) {
      return;
    }

    const response = await useFetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        body: {
            ...body
        }
    });

    if (response.data.value.route) {
        data.value.routes = data.value.routes.map((route) => {
            if (route.id !== routeId) {
                return route;
            }

            return response.data.value.route;
        });
        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function deleteRoute($el) {
    const routeId = $el.srcElement.dataset.id;
    const response = await useFetch(`/api/routes/${routeId}`, {
        method: 'DELETE'
    });

    if (response.data.value.route) {
        data.value.routes = data.value.routes.filter((route) => {
            return route.id !== routeId;
        });

        handleError();
    } else {
        handleError(response.data.value.message);
    }
  }

  async function assignTruck($el) {
    const routeId = $el.srcElement.dataset.id;

    const response = await useFetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        body: {
            truckId: $el.srcElement.parentElement.querySelector(`.truck-id-${routeId}`).value
        }
    });

    if (response.data.value.route) {
        data.value.routes = data.value.routes.map((route) => {
            if (route.id !== routeId) {
                return route;
            }

            return response.data.value.route;
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
  