const mongoose = require('mongoose');

const measureSchema = mongoose.Schema({
    humidity: {
        type: Number,
        require: true
    },
    temperatureCelsius: {
        type: Number,
        require: true
    },
    temperatureFahrenheit: {
        type: Number,
        require: true
    },
    heatIndexCelsius: {
        type: Number,
        require: true
    },    
    heatIndexFahrenheit: {
        type: Number,
        require: true
    }, 
    measureDate: {
        type: Date,
        default: Date.now
    }
});

const Measure = module.exports = mongoose.model('Measure', measureSchema);

module.exports.getMeasures = function(callback, limit){
    Measure.find(callback).limit(limit);
}

module.exports.getMeasureById = function(id, callback){
    Measure.findById(id, callback);
}

module.exports.addMeasure = function(measure, callback){
    Measure.create(measure, callback);
}

module.exports.updateMeasure = function(id, measure, option, callback){
    const query = {_id: id};
    const update = {
        humidity: measure.humidity,
        temperatureCelsius: measure.temperatureCelsius,
        temperatureFahrenheit: measure.temperatureFahrenheit,
        heatIndexCelsius: measure.heatIndexCelsius,
        heatIndexFahrenheit: measure.heatIndexFahrenheit,
        measureDate: measure.measureDate
    }
    Measure.findOneAndUpdate(query, update, option, callback);
}

module.exports.deleteMeasure = function(id, callback){
    const query = {_id : id};
    Measure.remove(query, callback);
}