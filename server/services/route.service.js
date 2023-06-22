import Route from '../models/route.model';
import truckService from './truck.service';

function execute(param = 'default', filter) {
  const queries = {
    trucks: Route.find(filter).populate('truck').select({ _id: 0, __v: 0 }),
    default: Route.find(filter).select({ _id: 0, __v: 0 })
  }

  return queries[param];
}

async function assignTruckStatus(body) {
  if (body.truckId) {
    const findTruckResult = await truckService.findOne({ id: body.truckId });

    if (!findTruckResult.truck || findTruckResult.truck.status !== 'free') {
      return {
        message: `Assign truck failed. No truck for such id or truck is busy. ID: ${body.truckId}`,
        error: true
      };
    }

    return await truckService.updateOne({ id: body.truckId, body: { status: 'busy' } });
  }

  return {};
}

const findAll = async (context) => {
  const { body } = context;
  const filter = {
    start: body.start,
    destination: body.destination,
    distance: body.distance,
    departureDate: body.departureDate,
    arrivalDate: body.arrivalDate,
    requiredType: body.requiredType,
    expectedRevenue: body.expectedRevenue,
    status: body.status,
  };

  Object.keys(filter).forEach(
    (k) => filter[k] === undefined && delete filter[k],
  );

  const total = await Route.countDocuments(filter);
  const result = await execute(body.bind, filter);

  return {
    message: 'Routes has been retrieved.',
    routes: result,
    total
  }; 
}

const findOne = async (context) => {
  const { body } = context;
  const filter = {
      ...body,
  };

  const route = await Route.findOne(filter).select({ _id: 0, __v: 0 });

  if (!route) {
    throw new Error('Route not found!');
  }

  return {
    message: 'Route has been found.',
    route,
  };
}

const create = async (context) => {
  const result = await Route.create(context);
  const { _id, __v, ...data } = result.toJSON();

  return {
    message: 'Route created!',
    route: data,
  };
}

const updateOne = async (context) => {
  const { body } = context;
  const filter = {
      id: context.id,
  };

  const updatedTruckResult = await assignTruckStatus(body);

  if (updatedTruckResult.error) {
    return { ...updatedTruckResult, route: null };
  }

  const updatedRoute = await Route.findOneAndUpdate(filter, { $set: body }, { new: true }).select({ _id: 0, __v: 0 });

  return {
    message: 'Route has been updated.',
    route: updatedRoute.toJSON(),
    truck: updatedTruckResult && updatedTruckResult.truck
  };
}

const deleteOne = async (context) => {
  const filter = {
      id: context.id,
  };

  const deletedRoute = await Route.findOneAndDelete(filter);

  if (!deletedRoute) {
    throw new Error('No route to delete');
  }

  return {
    route: deletedRoute.toJSON(),
    message: 'Route has been deleted.',
  };
}

export default { findAll, findOne, create, updateOne, deleteOne };
