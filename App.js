/* Importing Modules */
const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const hdbs = require('express-handlebars');
const { mongoDBUrl, PORT } = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const { globalVars } = require('./config/configuration');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { selectOptions } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');


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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Flash and Session */

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

/* Use Global Variables */
app.use(globalVars);

/* File Upload Middleware */
app.use(fileUpload());

/* Setup View Engine to Use Handlebars */
app.engine('handlebars', hdbs( { defaultLayout: 'default', runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true}, helpers: {select: selectOptions} } ));
app.set('view engine', 'handlebars');

/* Method Override Middleware */

app.use(methodOverride('newMethod'));

/* Routes */
const defaultRoutes = require('./routes/default-routes');
const adminRoutes = require('./routes/admin-routes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});