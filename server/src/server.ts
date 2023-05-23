import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import { fastifyMultipart } from '@fastify/multipart'
import { resolve } from 'path'

const app = fastify()

app.register(cors, { origin: true })
app.register(fastifyMultipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('👌ZAMMMM👍')
  })
