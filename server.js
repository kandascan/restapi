const express = require('express');
const socket = require('socket.io');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const router = require('./routes/router');
const config = require('./config/database');
const API_URL_MEASURE = 'https://korest.herokuapp.com/api/measure/';
const request = require('request');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log("Not connected to the database: " + err);
    } else {
        console.log("Connected to MongoDB");
    }
});

const server = app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

// Socket setup
const io = socket(server);

io.on('connection', socket => {
    console.log("Socket Id: " + socket.id + " connected");
    socket.on('test', data => {
        console.log('Socket on test on server :')
        console.log(data);
        data.iterator += 1;
        io.sockets.emit('test', data);
    });

    socket.on('chat message', data => {
        console.log('Socket on chat message on server :')
        console.log(data);
        io.sockets.emit('chat message', "text from server");
    });

    socket.on('new message', data => {
        console.log('Socket Id: ' + socket.id + ' send message:')
        console.log(data);
        io.sockets.emit('new message', { message: data });
    });

    socket.on('disconnect', () => {
        console.log("Socket Id: " + socket.id + " disconnected");
    });

    socket.on('tempSensor', data => {
        console.log("tempSensor");
        //process.stdout.write('\033c'); // clear console
        //console.log('Socket Id: ' + socket.id + ' send message:')
        console.log(data);
        io.sockets.emit('tempSensorUI', data);
        // ##################### here create measure object from data
        var measure = {
            "humidity": data.Humidity.substr(0, 5),
            "temperatureCelsius": data.Temperature.substr(0, 5),
            "temperatureFahrenheit": data.Temperature.substr(9, 5),
            "heatIndexCelsius": data["Heat index"].substr(0, 5),
            "heatIndexFahrenheit": data["Heat index"].substr(9, 5),
            "led": data.Led
        };
        var options = {
            url: API_URL_MEASURE,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: measure
        };
        request(options, function (err, res, body) {
            if (res && (res.statusCode === 200 || res.statusCode === 201)) {
                console.log(body);
            }
        });
    });

    socket.on('tempSensorServer', data => {
        console.log("tempSensorServer");
        console.log(data);
        io.sockets.emit('tempSensor', data);
    });

    socket.on('led', data => {
        console.log("led");
        //process.stdout.write('\033c'); // clear console
        //console.log('Socket Id: ' + socket.id + ' send message:')
        console.log(data);
        io.sockets.emit('led', data);
    });
});