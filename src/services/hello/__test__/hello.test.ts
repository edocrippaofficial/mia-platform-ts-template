import axios from 'axios'
import Pino from 'pino'
import nock from 'nock'

import { HelloService } from '../hello'

describe('Hello', () => {
  const baseURL = 'https://example.com'

  const axiosInstance = axios.create({ baseURL })
  const logger = Pino({ level: 'silent', customLevels: { audit: 35 } })

  it('should work', async() => {
    const serverMock = nock(baseURL)
      .get('/users/1')
      .reply(200, { id: '1', name: 'John' })

    const input = { id: '1' }

    const service = new HelloService({ logger, httpClient: axiosInstance })
    const response = await service.greet(input)

    expect(response).toEqual({ hello: 'John' })
    expect(serverMock.isDone()).toBeTruthy()
  })
})

