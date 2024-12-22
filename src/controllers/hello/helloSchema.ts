export const schema = {
  querystring: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
      },
      required: ['hello'],
      additionalProperties: false,
    },
    '4xx': {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const

export type HelloSchema = typeof schema
