import truckService from '../../services/truck.service';

export default defineEventHandler(async (event) => {
  try {
    const truckId = event.context.params.id;

    const result = await truckService.deleteOne({
      id: truckId
    });

    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});
