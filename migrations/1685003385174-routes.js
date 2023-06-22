import Route from '../server/models/route.model';

export const up = async (next) => {
  await Route.updateMany({}, {$set: {}})
  next()
}

export const down = async (next) => {
  await Route.updateMany({}, {$set: {}})
  next()
}
