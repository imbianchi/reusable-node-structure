const models = require('@models');
const { v4 } = require('uuid');
const { Op } = require("sequelize");
const now = new Date();

module.exports = class AuthRepository {
    constructor() { }

    async insertOne(options) {
        options.id = v4();
        try {
            return await models.Sessions.create(options)
                .then(result => {
                    const dataObj = result.get({ plain: true })
                    return dataObj;
                })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD INDEX - ', `[${now}] - Error: `, error)
            throw error;
        }
    };

    async getOne(data) {
        try {
            return await models.Sessions.findAll({
                limit: 1,
                raw: true,
                order: [['createdAt', 'DESC']],
                where: {
                    id: data.id,
                },
            })
                .then(result => result)
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD INDEX - ', `[${now}] - Error: `, error)
            throw error;
        }
    };

    async updateOne(data) {
        try {
            return await models.Sessions.update(
                data,
                {
                    returning: true,
                    plain: true,
                    where: {
                        id: data.id || data.sessionId,
                    },
                })
                .then(result => result[1].dataValues)
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD INDEX - ', `[${now}] - Error: `, error)
            throw error;
        }
    };
}