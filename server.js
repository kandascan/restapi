const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const router = require('./routes/router');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds251827.mlab.com:51827/' + process.env.DB_NAME, function (err) {
    if (err) {
        console.log("Not connected to the database: " + err);
    } else {
        console.log("Connected to MongoDB");
    }
});

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});