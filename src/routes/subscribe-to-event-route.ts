import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      //validar o que está vindo do body
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply /*resposta customizada*/) => {
      const { name, email } = request.body

      //criação da inscrição no banco de dados
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
      })

      return reply.status(201).send({
        subscriberId,
      })
    }
  )
}
