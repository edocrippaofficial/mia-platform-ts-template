import { describe, it, before, afterEach, mock, after } from 'node:test'
import { equal, deepEqual } from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { setupFastify } from '../../../app'
import { testEnvs } from '../../../__test__/testUtils'

import * as helloServiceModule from '../../../services/hello/hello'

describe('hello route', async() => {
  let server: FastifyInstance
  let mockService: any
  let originalHelloService: any

  before(async() => {
    originalHelloService = helloServiceModule.HelloService

    mockService = {
      greet: mock.fn(),
    }

    // @ts-ignore
    helloServiceModule.HelloService = function HelloService() {
      return mockService
    }

    server = await setupFastify(testEnvs)
  })

  afterEach(() => {
    mock.reset()
  })

  after(() => {
    // @ts-ignore
    helloServiceModule.HelloService = originalHelloService
  })

  it('should return 200 if the greet is successful', async() => {
    mockService.greet.mock.mockImplementation(async() => {
      return { hello: 'John' }
    })

    const response = await server.inject({
      method: 'GET',
      url: {
        pathname: '/hello',
        query: {
          id: '1',
        },
      },
    })

    // API assertions
    equal(response.statusCode, 200)
    deepEqual(JSON.parse(response.payload), {
      hello: 'John',
    })

    // Service assertions
    const expectedData = { id: '1' }
    const serviceArguments = { ...mockService.greet.mock.calls[0].arguments[0] }
    equal(mockService.greet.mock.callCount(), 1)
    deepEqual(serviceArguments, expectedData)
  })

  it('should return 4xx if the service throws with a 4xx error', async() => {
    // Setup dell'errore per questo test
    const serviceError = new Error('service error') as any
    serviceError.statusCode = 404

    // Setup del mock per questo test
    mockService.greet.mock.mockImplementation(async() => {
      throw serviceError
    })

    const response = await server.inject({
      method: 'GET',
      url: {
        pathname: '/hello',
        query: {
          id: '1',
        },
      },
    })

    // API assertions
    equal(response.statusCode, serviceError.statusCode)
    equal(JSON.parse(response.payload).message, serviceError.message)
  })
})
