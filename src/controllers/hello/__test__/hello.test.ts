import type { FastifyInstance } from 'fastify'
import { setupFastify } from '../../../app'
import { testEnvs } from '../../../__test__/testUtils'

import { HelloService } from '../../../services/hello/hello'
jest.mock('../../../services/hello/hello')

describe('hello route', () => {
  let server: FastifyInstance
  let mockService: jest.Mocked<HelloService>

  beforeAll(async() => {
    server = await setupFastify(testEnvs)

    mockService = new HelloService({} as any) as jest.Mocked<HelloService>
    (HelloService as jest.Mock).mockReturnValue(mockService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if the greet is successful', async() => {
    mockService.greet.mockResolvedValue({ hello: 'John' })

    const response = await server.inject({
      method: 'GET',
      url: {
        pathname: '/hello',
        query: {
          id: '1',
        },
      },
    })

    // API
    expect(response.statusCode).toEqual(200)
    expect(JSON.parse(response.payload)).toEqual({
      hello: 'John',
    })

    // Service
    const expectedData = { id: '1' }
    expect(mockService.greet).toHaveBeenCalledTimes(1)
    expect(mockService.greet).toHaveBeenCalledWith(expectedData)
  })

  it('should return 4xx if the service throws with a 4xx error', async() => {
    const serviceError = new Error() as any
    serviceError.statusCode = 404
    serviceError.message = 'service error'
    mockService.greet.mockRejectedValue(serviceError)

    const response = await server.inject({
      method: 'GET',
      url: {
        pathname: '/hello',
        query: {
          id: '1',
        },
      },
    })

    // API
    expect(response.statusCode).toEqual(serviceError.statusCode)
    expect(JSON.parse(response.payload).message).toEqual(serviceError.message)
  })
})

