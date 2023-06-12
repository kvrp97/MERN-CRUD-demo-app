const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts');

//app middleware
app.use(bodyParser.json());

app.use(cors());

//route middleware
app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb+srv://rp97:1212@mernappcluster.4hjk87w.mongodb.net/mernCrud?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
    .then(() => {
        console.log('DB connection established');
    })
    .catch((error) => {
        console.log('Error connecting to DB: ' + error.message);
    })

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});