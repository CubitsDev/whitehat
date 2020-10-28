const express = require('express');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const app = express();
var http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

var clients = [];

//Listen for clients connecting
io.on('connection', (socket) => {
    console.log('[Socket] A user connected'.black.bgGreen);
    clients.push(socket);
    io.emit('clientsConnected', clients.length);
    socket.on('disconnect', () => {
      console.log('[Socket] A user disconnected'.black.bgGreen);
      clients.splice(clients.indexOf(socket), 1);
      io.emit('clientsConnected', clients.length);
    });
});


app.post('/tasks/create', (req, res) => {
    console.log('[Express] GET Request to /tasks/create'.yellow.bgBlack)
    let newTask = {
        id: req.body.id,
        text: req.body.text,
        status: 0
    }
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf-8', function(err, results) {
        if (err) throw err;

        var currentFile = JSON.parse(results)
        currentFile.push(newTask);
        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(currentFile), function (err) {
            if (err) throw err;
            console.log(`[FS] Written to file: ${path.join(__dirname, 'tasks.json')}`.blue.bgBlack)
            io.emit('taskUpdate');
            res.send(true);
        });
    })
})

app.get('/tasks/all', (req, res) => {
    console.log('[Express] GET Request to /tasks/all'.yellow.bgBlack)
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf-8', function(err, results) {
        if (err) throw err;

        res.send(results)
    })
})

app.post('/tasks/update', (req, res) => {
    console.log('[Express] POST Request to /tasks/update'.yellow.bgBlack)
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf-8', function(err, results) {
        if (err) throw err;

        var currentFile = JSON.parse(results)
        var i = currentFile.findIndex((element) => element.id == req.body.id);
        currentFile[i].status = req.body.status;
        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(currentFile), function (err) {
            console.log(`[FS] Written to file: ${path.join(__dirname, 'tasks.json')}`.blue.bgBlack)
            if (err) throw err;
            io.emit('taskUpdate');
            res.send(true);
        });
    })

})

app.post('/tasks/delete', (req, res) => {
    console.log('[Express] POST Request to /tasks/delete'.yellow.bgBlack)
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf-8', function(err, results) {
        if (err) throw err;

        var currentFile = JSON.parse(results)
        var i = currentFile.findIndex((element) => element.id == req.body.id);
        currentFile.splice(i, 1);
        fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(currentFile), function (err) {
            if (err) throw err;
            io.emit('taskUpdate');
            res.send(true);
        });
    })
})


http.listen(3000, () => {
    console.log('[Express] Server online and running on port 3000'.yellow.bgBlack);
})