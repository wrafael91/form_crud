const express = require('express');
const router = express.Router(); // método que se encarga de devolver un objeto

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index', {
        tasks //tasks: tasks
    });
})

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send('received');
})

module.exports = router; //exportando el método

