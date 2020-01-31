const express = require('express');
const routes = require('./app/routes/note.routes.js');
const bodyParser = require('body-parser');

const app = express();

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).then(() =>{
    console.log('Database successfully connected!');
}).catch((err) => {
    console.log('Unable to connect to the database'+err);
    process.exit();
})

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.json({ "message": "Welcome to Notes!"});
})

app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});