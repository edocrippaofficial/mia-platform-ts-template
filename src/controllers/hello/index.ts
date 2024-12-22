import type { FastifyInstance } from 'fastify'

import { schema } from './helloSchema'
import { helloHandler } from './helloHandler'

export default async function registerRoute(fastify: FastifyInstance) {
  fastify.get('/hello', { schema }, helloHandler)
}
