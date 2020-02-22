const express = require('express');
const path = require('path');
const config = require('./config');

/** APP */
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))

const router = express.Router();
router.route('/')
    .get((req, res) => {
        //get all versions from DB
        res.send('Retrieving List...');
    })
    .post((req, res) => {
        //create a version
    })
    .delete((req, res) => {
        //remove a version
    })
    .put((req, res) => {
        //update a version
    })

app.use('/versions', router)

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`))