const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/persons', function(req, res){
    Person.getPerson(function(err, person){
        if(err){
            throw err;
        }
        res.json(person);
    });
});

router.get('/persons/:_id', function(req, res){
    Person.getPersonById(req.params._id, function(err, person){
        if(err){
            throw err;
        }
        res.json(person);
    });
});

router.post('/persons', function(req, res){
    var person = req.body;
    Person.addPerson(person, function(err, person){
        if(err){
            throw err;
        }
        res.json(person);
    });
});

router.put('/persons/:_id', function(req, res){
    var id = req.params._id;
    var person = req.body;
    Person.updatePerson(id, person, {}, function(err, person){
        if(err){
            throw err;
        }
        res.json(person);
    });
});

router.delete('/persons/:_id', function(req, res){
    var id = req.params._id;
    Person.deletePerson(id, function(err, person){
        if(err){
            throw err;
        }
        res.json(person);
    });
});

module.exports = router;