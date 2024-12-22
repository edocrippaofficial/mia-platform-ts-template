import Fastify from 'fastify'
import MiaHotStart from 'mia-hot-start'

import getDefaultFastifyOptions from './config/defaultFastifyOptions'
import { envSchema } from './config/envs'

import { addCustomMetric } from './metrics/customMetrics'

import helloRoute from './controllers/hello'

async function setupFastify(envSchemaOptions?: any) {
  const fastify = Fastify(getDefaultFastifyOptions())
  await fastify.register(MiaHotStart, {
    envSchema,
    envSchemaOptions,
    logLevelEnvKey: 'LOG_LEVEL',
  })

  // create a custom metric
  const customMetric = new fastify.metrics.client.Counter({
    name: 'custom_metric',
    help: 'This is a custom metric',
    labelNames: ['foo'],
  })
  addCustomMetric(customMetric, 'custom_metric')

  // register a route
  fastify.register(helloRoute)

  return fastify
}

export { setupFastify }
