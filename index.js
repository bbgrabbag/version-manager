const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))

const router = express.Router();
router.route('/')
    .get(async (req, res, next) => {
        try {
            const versions = await db.getVersions();
            res.status(200).send(versions);
        } catch (e) {
            next({ status: 500, message: 'Unable to retrieve versions' })
        }
    })
    .post(async (req, res, next) => {
        //create a version
        try {
            const version = await db.createVersion(req.body);
            res.status(200).send(version);
        } catch (e) {
            next({ status: 500, message: 'Unable to create new version' })
        }
    })
    .delete((req, res) => {
        //remove a version
    })
    .put((req, res) => {
        //update a version
    })

app.use('/versions', router)
app.use((error, req, res, next) => {
    res.status(error.status).send(error.message)
});

mongoose.connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log(`Connected to DB`));

app.listen(process.env.PORT, () => console.log(`Listening on Port ${process.env.PORT}`))