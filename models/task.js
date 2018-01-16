var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Task = module.exports = mongoose.model('Task', taskSchema);

module.exports.getTasks = function(callback, limit){
    Task.find(callback).limit(limit);
}

module.exports.getTaskById = function(id, callback){
    Task.findById(id, callback);
}

module.exports.addTask = function(task, callback){
    Task.create(task, callback);
}

module.exports.updateTask = function(id, task, option, callback){
    var query = {_id: id};
    var update = {
        name: task.name
    }
    Task.findOneAndUpdate(query, update, option, callback);
}

module.exports.deleteTask = function(id, callback){
    var query = {_id : id};
    Task.remove(query, callback);
}