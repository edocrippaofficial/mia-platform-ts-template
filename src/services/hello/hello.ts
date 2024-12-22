import type { AxiosInstance } from 'axios'
import type { BaseLogger } from 'pino'

export type HelloConfig = {
  logger: BaseLogger
  httpClient: AxiosInstance
}

export class HelloService {
  private readonly logger: BaseLogger
  private readonly httpClient: AxiosInstance

  constructor(config: HelloConfig) {
    this.logger = config.logger
    this.httpClient = config.httpClient
  }

  async greet(data: { id: string }) {
    const { id } = data

    type User = { id: number, name: string }
    const user = await this.httpClient.get<User>(`/users/${id}`)
    this.logger.info(user.data, 'user response')

    return { hello: user.data.name }
  }
}
