const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },    
    city: {
        type: String,
        require: true
    },
});

const Person = module.exports = mongoose.model('Person', personSchema);

module.exports.getPersons = function(callback, limit){
    Person.find(callback).limit(limit);
}

module.exports.getPersonById = function(id, callback){
    Person.findById(id, callback);
}

module.exports.addPerson = function(person, callback){
    Person.create(person, callback);
}

module.exports.updatePerson = function(id, person, option, callback){
    const query = {_id: id};
    const update = {
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age,
        city: person.city
    }
    Person.findOneAndUpdate(query, update, option, callback);
}

module.exports.deletePerson = function(id, callback){
    const query = {_id : id};
    Person.remove(query, callback);
}