import { createServer } from 'miragejs'
import users from './db.json'

export function makeServer() {
  let server = createServer({
    routes() {
      this.namespace = "api"

      this.get('/users', () => {
        return users
      })
    },
  })

  return server
}