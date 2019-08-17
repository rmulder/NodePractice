const express = require('express');

const router = express.Router();
const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    }
];
router.get('/', (req, res) => {
    res.send(courses);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course NOT FOUND');
    else res.status(200).send(course);
});

router.post('/', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(201).send({ message: 'INSERTED SUCCESSFULLY', data: courses});
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if (!course) res.status(404).send('Course NOT FOUND');
    else{
        course.name = req.body.name;
        res.status(200).send({ message: 'UPDATED SUCCESSFULLY', data: courses});
    }
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if (!course) res.status(404).send('Course NOT FOUND');
    else{
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.status(200).send({ message: 'DELETED SUCCESSFULLY', data: courses});
    }
});

module.exports = router;