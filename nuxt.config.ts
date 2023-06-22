// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        db: {
            host: process.env.MONGODB_HOST,
            port: process.env.MONGODB_PORT,
            database: process.env.MONGODB_DATABASE,
            password: process.env.MONGODB_PASSWORD,
            user: process.env.MONGODB_USERNAME
        },
        environment: process.env.NODE_ENV
    },
    nitro: {
        plugins: ['~/server/db.js'],
        preset: 'aws-lambda',
        serveStatic: true
    },
    modules: ['@nuxtjs/tailwindcss']
});
