const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionsSchema = new Schema(
    {
        userId: String,
        osName: String,
        osVersion: String,
        device: String,
        browser: String,
        browserVersion: String,
        browserEngine: String,
        browserEngineVersion: String,
        refreshToken: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Sessions', SessionsSchema);