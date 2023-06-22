import sls from 'serverless-http';
import binaryMimeTypes from './binaryMimeTypes';
import nuxt from './nuxtBuild';

export const nuxt = sls(nuxt, {
  binary: binaryMimeTypes
});
