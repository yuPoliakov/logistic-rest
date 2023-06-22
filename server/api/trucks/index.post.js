import truckService from '../../services/truck.service';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const result = await truckService.create(body);
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});