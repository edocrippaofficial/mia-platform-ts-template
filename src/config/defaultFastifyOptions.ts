import type { FastifyServerOptions } from 'fastify'
import { type LoggerOptions, pino } from 'pino'

// Sensible default redaction rules
// all first level properties in object or array of objects
// we don't want to see emails, usernames and passwords even if encrypted and/or hashed
const logger = {
  level: 'info',
  redact: {
    paths: [
      'email', '[*].email',
      'password', '[*].password',
      'username', '[*].username',
      'authorization', 'Authorization', '[*].authorization', '[*].Authorization',
      'cookie', 'Cookie', '[*].cookie', '[*].Cookie',
    ],
    censor: '[REDACTED]',
  },
  timestamp: true,
  serializers: {
    error: pino.stdSerializers.err,
  },

  // Custom logger level
  customLevels: { audit: 35 },
} satisfies LoggerOptions

// 2,147,483,647 (2^31 − 1) stands for max SMI value (an internal optimization of V8).
const virtualMaxInt = 2147483647

// Very opinionated default options for the Fastify server instance
// It's a function because every instance of Fastify must have a different instance of the configuration
// due to its internal process that modify this object
export default () => {
  return {
    logger,
    // even after closing the server, it routes the incoming request as usual
    return503OnClosing: false,
    // use “legacy” header version with prefixed x- for better compatibility with existing enterprises infrastructures
    requestIdHeader: 'x-request-id',
    // set 30 seconds to plugins to load
    pluginTimeout: 30000,
    // virtually disable the max body size limit
    bodyLimit: virtualMaxInt,
    // do not log requests and replies since we have a custom logger
    disableRequestLogging: true,
  } satisfies FastifyServerOptions as FastifyServerOptions
}
