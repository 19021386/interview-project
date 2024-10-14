import app from '../app'
import http from 'http'
function dev() {
  const port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)

  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
  })

  function normalizePort(val: string) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
      return val
    }

    if (port >= 0) {
      return port
    }

    return false
  }
}

dev()
