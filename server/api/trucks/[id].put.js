import truckService from '../../services/truck.service';

export default defineEventHandler(async (event) => {
  try {
    const truckId = event.context.params.id;
    const body = await readBody(event);
  
    const result = await truckService.updateOne({
      id: truckId,
      body
    });
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});