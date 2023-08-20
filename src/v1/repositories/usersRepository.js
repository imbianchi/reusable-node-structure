const models = require('@models');
const { Op } = require("sequelize");
const now = new Date();


module.exports = class UsersRepository {
    constructor() { }

    async getAll() {
        try {
            return await models.Users.findAll({})
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
            return await models.Users.findOne({
                where: {
                    [Op.or]: [
                        { id: data.id || "" },
                        { email: data.email || "" },
                        { fullName: data.name || "" },
                    ]
                },
                raw: true,
            })
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
            // return Users.find({})
            //     .lean()
            //     .then(result => result)
            //     .catch(error => {
            //         throw error;
            //     })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD insertOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async deleteOne() {
        try {
            // return Users.find({})
            //     .lean()
            //     .then(result => result)
            //     .catch(error => {
            //         throw error;
            //     })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD deleteOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async updateOne() {
        try {
            // return Users.find({})
            //     .lean()
            //     .then(result => result)
            //     .catch(error => {
            //         throw error;
            //     })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD updateOne - ', `[${now}] - Error: `, error);
            throw error;
        }
    }
}   