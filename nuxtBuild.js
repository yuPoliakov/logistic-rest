import Nuxt from 'nuxt';
import config from './nuxt.config.ts';

const nuxt = new Nuxt({ ...config, dev: false })

export default (req, res) => {
  return nuxt.ready().then(() => nuxt.server.app(req, res))
};
