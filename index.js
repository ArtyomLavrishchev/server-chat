const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors')
const io = require('socket.io')(http, {cors: {origin: "*"}});
const port = 8080;
app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello')
});

io.on('connection', socket => {
    console.log('connected', socket.id)
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
})

http.listen(port, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`listening port: http://localhost:${port}/`)
})
