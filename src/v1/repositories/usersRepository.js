const Users = require('../models/usersModel');
const now = new Date();


module.exports = class UsersRepository {
    constructor() { }

    async getAll() {
        try {
            return Users.find({})
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD getAll - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async getOne(data) {
        try {
            return Users.findOne({
                $or: [
                    { _id: data.id },
                    { email: data.email },
                    { name: data.name },
                ]
            })
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD getOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async insertOne() {
        try {
            return Users.find({})
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD insertOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async deleteOne() {
        try {
            return Users.find({})
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD deleteOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async updateOne() {
        try {
            return Users.find({})
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD updateOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }
}   