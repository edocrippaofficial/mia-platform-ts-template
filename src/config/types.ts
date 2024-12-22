import type { FastifyReply, FastifyRequest, FastifySchema, RawServerDefault, RouteGenericInterface } from 'fastify'
import type { IncomingMessage } from 'node:http'
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

import type { LogFn } from 'pino'
import type { ContextConfigDefault, RawReplyDefaultExpression, RawRequestDefaultExpression } from 'fastify/types/utils'

// Add metrics types
/* istanbul ignore next */
export * from 'fastify-metrics'

export type TypedRequest<Schema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  IncomingMessage,
  Schema,
  JsonSchemaToTsProvider
>

export type TypedReply<Schema extends FastifySchema> = FastifyReply<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  ContextConfigDefault,
  Schema,
  JsonSchemaToTsProvider
>

declare module 'fastify' {
  export interface FastifyBaseLogger {
    // My custom log level
    audit: LogFn
  }
}

declare module 'pino' {
  export interface BaseLogger {
    // My custom log level
    audit: LogFn
  }
}
