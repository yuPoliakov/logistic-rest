import routeService from '../../services/route.service';

export default defineEventHandler(async (event) => {
  try {
    const params = getQuery(event);
    const result = await routeService.findAll({ body: params });
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});