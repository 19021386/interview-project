/**
 * Module dependencies.
 */
function dev() {}

import app from '../app' // Assuming the app module is using ES6 export
// import debug from 'debug'; // You can uncomment this line if using 'debug'
import http from 'http'

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

dev()
