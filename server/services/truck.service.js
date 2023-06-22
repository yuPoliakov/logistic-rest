import Truck from '../models/truck.model';

const findAll = async (context) => {
  const { body } = context;
  const filter = {
    numberPlate: body.numberPlate,
    status: body.status,
    model: body.model,
    boughtDate: body.boughtDate,
    mileage: body.mileage,
    type: body.type,
  };

  Object.keys(filter).forEach(
    (k) => filter[k] === undefined && delete filter[k],
  );

  const total = await Truck.countDocuments(filter);
  const result = await Truck.find(filter)
    .select({ _id: 0, __v: 0 });

  return {
    message: 'Trucks have been retrieved.',
    trucks: result,
    total,
  };   
}

const findOne = async (context) => {
  const { body } = context;
  const filter = {
    id: context.id,
    ...body,
  };

  const truck = await Truck.findOne(filter).select({ _id: 0, __v: 0 });

  if (!truck) {
    return { message: 'Truck not found!' }
  }

  return {
    message: 'Truck have been retrieved.',
    truck,
  };
}

const create = async (context) => {
  const result = await Truck.create(context);
  const { _id, __v, ...data } = result.toJSON();

  return {
    message: 'Truck created!',
    truck: { ...data },
  };
}

const updateOne = async (context) => {
  const { body } = context;
  const filter = {
    id: context.id,
  };

  const truck = await Truck.findOneAndUpdate(filter, { $set: body }, { new: true }).select({ _id: 0, __v: 0 });

  return {
    message: 'Truck has been updated.',
    truck: truck.toJSON(),
  };
}

const deleteOne = async (context) => {
  const filter = {
    id: context.id
  };

  const deletedTruck = await Truck.findOneAndDelete(filter);

  return {
      message: 'Truck has been deleted.',
      truck: deletedTruck
  };
}

export default { findAll, findOne, create, updateOne, deleteOne };
