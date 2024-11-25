/** Arquivo de tipos personalizados do fastify. */

import fastify from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => Promise<void>;
  }
}