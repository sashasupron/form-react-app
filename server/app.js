const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

let entities = [
    {
        name: 'John',
        surname: 'Doe',
        course: '1',
        subject: 'Math',
        group: '1/11',
        email: 'john.doe@email.com',
        hasExtra: 'yes', 
        extraSelect: 'Core subject',
        extraText: 'Dyploma',
        projects: [
            { name: 'Write a chapter', status: 'To do' }
        ],
    }
];


app.post('/api/enroll', (req, res) => {
    const updates = req.body;

    if (updates.index !== undefined) {
        const idx = updates.index;
        if (entities[idx]) {
        Object.keys(updates).forEach(key => {
            if (key !== 'index') {
            entities[idx][key] = updates[key];
            }
        });
        return res.json({ message: 'Entity updated', entity: entities[idx] });
        } else {
            return res.status(404).json({ message: 'Entity not found' });
        }
    }

    entities.push(updates);
    res.json({ message: 'Entity added', entities });
});



app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/api/enroll', (req, res) => {
    res.json(entities);
});


app.delete('/api/enroll/:index', (req, res) => {
    const idx = parseInt(req.params.index, 10);

    if (isNaN(idx) || idx < 0 || idx >= entities.length) {
        return res.status(400).json({ message: 'Invalid index' });
    }

    const removedEntity = entities.splice(idx, 1)[0]; 

    res.json({ message: 'Entity deleted', removedEntity, entities });
});



module.exports = app;



