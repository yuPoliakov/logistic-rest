import routeService from '../../services/route.service';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const result = await routeService.create(body);
  
    return { ...result };
  } catch (error) {
    return { message: error.message, error: true};
  }
});