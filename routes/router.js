const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Person = require('../models/person');

router.get('/persons', function(req, res){
    Person.getPersons(function(err, person){
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

//////////////////////////////////////////////////////////////////////////

router.get('/tasks', function(req, res){
    Task.getTasks(function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

router.get('/tasks/:_id', function(req, res){
    Task.getTaskById(req.params._id, function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

router.post('/tasks', function(req, res){
    var task = req.body;
    Task.addTask(task, function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

router.put('/tasks/:_id', function(req, res){
    var id = req.params._id;
    var task = req.body;
    Task.updateTask(id, task, {}, function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

router.delete('/tasks/:_id', function(req, res){
    var id = req.params._id;
    console.log(id);
    Task.deleteTask(id, function(err, task){
        if(err){
            throw err;
        }
        res.json(task);
    });
});

module.exports = router;