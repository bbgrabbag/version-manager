const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: String
}, {
    timestamps: true
});

const VersionModel = mongoose.model('Versions', VersionSchema);

const getVersions = async (query = {}) => {
    return await VersionModel.find(query)
}
const createVersion = async (version) => {
    const versionDocument = new VersionModel(version);
    return await versionDocument.save();
}

module.exports = {
    getVersions,
    createVersion
}
//Create, Read, Update, Delete