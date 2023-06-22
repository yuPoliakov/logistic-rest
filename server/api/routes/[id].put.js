import routeService from '../../services/route.service';

export default defineEventHandler(async (event) => {
  try {
    const routeId = event.context.params.id;
    const body = await readBody(event);
  
    const result = await routeService.updateOne({
      id: routeId,
      body
    });
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});