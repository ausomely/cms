/* Importing Modules */
const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const hdbs = require('express-handlebars');
const { mongoDBUrl, PORT } = require('./config/configuration');

const app = express();

/* Config Mongoose connection to MongoDB */
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('MongoDB Connected Successfully');
    }).catch(err => {
        console.log('Database connection failed');
    });

/* Config express */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/* Setup View Engine to Use Handlebars */
app.engine('handlebars', hdbs( { defaultLayout: 'default' } ));
app.set('view engine', 'handlebars');

/* Routes */
app.use('/', (req, res) => {
    res.render('default/index');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});