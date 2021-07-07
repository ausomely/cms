/* Importing Modules */
const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');

const PORT = 3000;
const app = express();

/* Config Mongoose connection to MongoDB */
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('MongoDB Connected Successfully');
    }).catch(err => {
        console.log('Database connection failed');
    });
/* Config express */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', (req, res) => {
    res.send('Welcome to the CMS App');
});

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});