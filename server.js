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
const Measure = require('./models/measure');
const API_URL_MEASURE = 'https://korest.herokuapp.com/api/measure/';

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

    socket.on('tempSensor', data =>{
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
            "heatIndexFahrenheit": data["Heat index"].substr(9, 5)
            };
            $.ajax({
                url: API_URL_MEASURE,
                type: 'POST',
                dataType: 'JSON',
                data: JSON.stringify(measure),
                contentType: "application/json",
                success: function (data) {
                    console.log(data);
                }
            });
        // var measure = {
        //     "humidity": 12.12,
        //     "temperatureCelsius": 25.30,
        //     "temperatureFahrenheit": 77.70,
        //     "heatIndexCelsius": 25.50,
        //     "heatIndexFahrenheit": 75.50
        // };
        // //console.log(measure);
        // Measure.addMeasure(measure, function(err, measure){
        //     if(err){
        //         throw err;
        //     }
        //     res.json(measure);
        // });
    });

    socket.on('tempSensorServer', data =>{
        console.log("tempSensorServer");
        console.log(data);
        io.sockets.emit('tempSensor', data);
    });

    socket.on('led', data =>{
        console.log("led");
        //process.stdout.write('\033c'); // clear console
        //console.log('Socket Id: ' + socket.id + ' send message:')
        console.log(data);
        io.sockets.emit('led', data);
    });

});

var insertSensorData = function(data) {
   
    var measure = {
    "humidity": data.Humidity.substr(0, 5),
    "temperatureCelsius": data.Temperature.substr(0, 5),
    "temperatureFahrenheit": data.Temperature.substr(9, 5),
    "heatIndexCelsius": data["Heat index"].substr(0, 5),
    "heatIndexFahrenheit": data["Heat index"].substr(9, 5)
    };
    $.ajax({
        url: API_URL_MEASURE,
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(measure),
        contentType: "application/json",
        success: function (data) {
            console.log(data);
        }
    });
};