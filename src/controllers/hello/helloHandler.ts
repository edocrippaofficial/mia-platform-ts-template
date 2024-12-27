import type { Counter } from 'prom-client'
import { getCustomMetric } from '../../metrics/customMetrics'

import type { Envs } from '../../config/envs'
import type { TypedReply, TypedRequest } from '../../config/types'

import { HelloSchema } from './helloSchema'
import { HelloService } from '../../services/hello/hello'

export async function helloHandler(request: TypedRequest<HelloSchema>, reply: TypedReply<HelloSchema>) {
  // use an environment variable
  const envs = request.getEnvs<Envs>()
  request.log.info(envs.FOO, 'FOO')

  // increase a Prometheus metric
  const customMetric = getCustomMetric('custom_metric') as Counter
  customMetric.labels({ foo: 'bar' }).inc(10)

  // create an HTTP Client
  const httpClient = request.getHttpClient('https://jsonplaceholder.typicode.com/')

  // implement business logic in a service
  const service = new HelloService({ logger: request.log, httpClient })
  const response = await service.greet(request.query)

  reply.send(response)
}
