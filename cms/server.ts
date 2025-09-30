import express from 'express'
import payload from 'payload'
import config from './payload.config.js'

const app = express()

const start = async (): Promise<void> => {
  await payload.init({
    config,
    express: app,
  })

  const port = process.env.PORT || 1337

  app.listen(port, () => {
    console.log(`[server]: Payload server is running at http://localhost:${port}`)
  })
}

start()