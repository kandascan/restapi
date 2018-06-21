const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    led: {
        type: Boolean,
        require: true
    },
    measureDate: {
        type: Date,
        default: Date.now
    }
});

measureSchema.plugin(mongoosePaginate);

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
        led: measure.led,
        measureDate: measure.measureDate
    }
    Measure.findOneAndUpdate(query, update, option, callback);
}

module.exports.deleteMeasure = function(id, callback){
    const query = {_id : id};
    Measure.remove(query, callback);
}

module.exports.paginationMeasure = function(page, size, callback){
    // var query = {
    //     page: parseInt(page),
    //     limit: parseInt(size)
    // }; 
    // Measure.paginate({}, query, callback);    
    var query   = {};
    var options = {
    //select:   'id',
    sort:     { measureDate: -1 },
    //populate: 'author',
    lean:     true,
    offset:   parseInt(page), 
    limit:    parseInt(size)
    };
    Measure.paginate(query, options, callback);  
}