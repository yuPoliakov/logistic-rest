import truckService from '../../services/truck.service';

export default defineEventHandler(async (event) => {
  try {
    const params = getQuery(event);
    const result = await truckService.findAll({ body: params });
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});