import routeService from '../../services/route.service';

export default defineEventHandler(async (event) => {
  try {
    const routeId = event.context.params.id;
  
    const result = await routeService.deleteOne({
      id: routeId
    });
    
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }

});