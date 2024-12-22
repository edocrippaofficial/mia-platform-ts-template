import type { FromSchema, JSONSchema } from 'json-schema-to-ts'

export const envSchema = {
  type: 'object',
  properties: {
    HTTP_PORT: { type: 'number', default: 3000 },
    LOG_LEVEL: { type: 'string', default: 'trace' },
    FOO: { type: 'string', default: 'bar' },
  },
  additionalProperties: false,
} as const satisfies JSONSchema

export type Envs = FromSchema<typeof envSchema>
