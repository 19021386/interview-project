/* eslint-disable prettier/prettier */

/**
 * Module dependencies.
 */
function dev() { }
const app = require('../app');
// const debug = require('debug')('my-app:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server listening on port: " + port)
})

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

dev();
