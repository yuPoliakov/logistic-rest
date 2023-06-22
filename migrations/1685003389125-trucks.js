import Truck from '../server/models/truck.model'

export const up = async (next) => {
  await Truck.updateMany({}, {$set: {}})
  next()
}

export const down = async (next) => {
  await Truck.updateMany({}, {$set: {}})
  next()
}
