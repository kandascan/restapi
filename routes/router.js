const express = require('express');
const router = express.Router();
const Task = require('../models/task');

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