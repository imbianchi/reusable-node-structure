const Users = require('../models/Users');
const ReplyManager = require('../managers/replyManager');
const now = new Date();


module.exports = class UserRepository {
    constructor() {
        this.replyManager = new ReplyManager();
    }

    async getAll() {
        try {
            return Users.find({})
                .select({ password: 0 })
                .lean()
                .then(result => result)
                .catch(error => {
                    throw error;
                })
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD INDEX - ', `[${now}] - Error: `, error);
            throw error;
        }
    }

    async getOne(payload) {
        const {
            id,
            username,
            email,
            userId,
            refreshToken,
        } = payload;

        try {
            if ((username || email) && !refreshToken) {
                return Users.find({
                    $or: [
                        { 'username': username },
                        { 'email': email },
                    ]
                })
                    .then(result => {
                        if (!result) {
                            this.replyManager.handleError(
                                this.replyManager.statusEnum.notFound,
                                'User not found! Please, check user ID and try again.',
                            )
                        }

                        result._id = !!result._id && result._id.toString();
                        result.password = "";

                        return result;
                    })
                    .catch(error => {
                        console.log(
                            '[ERROR] - [[File: userRepository.js - METHOD Users.find - ',
                            `[${now}] - ${error}`,
                        );
                        throw error;
                    });
            };

            return Users.findById(refreshToken ? userId : id).select().lean()
                .then(result => {

                    if (!result) {
                        this.replyManager.handleError(
                            this.replyManager.statusEnum.notFound,
                            'User not found! Please, check user ID and try again.',
                        )
                    }

                    result._id = result._id.toString();
                    result.password = "";

                    return result;
                })
                .catch(error => {
                    console.log(
                        '[ERROR] - [[File: userRepository.js - METHOD Users.findById - ',
                        `[${now}] - ${error}`,
                    );
                    throw error;
                });
        } catch (error) {
            console.log(
                '[ERROR] - [[File: userRepository.js - METHOD async find - ',
                `[${now}] - ${error}`,
            );
        };
    }

    async createOne(payload) {
        const data = {
            name: payload.name,
            username: payload.username,
            password: payload.password,
            email: payload.email,
        };

        try {
            const doc = await Users.create(data)
                .then(result => result)
                .catch(error => {
                    console.log(
                        '[ERROR] - [[File: userRepository.js - METHOD Users.create - ',
                        `[${now}] - ${error}`,
                    );
                });

            doc.password = '';

            return doc;
        } catch (error) {
            console.log(
                '[ERROR] - [[File: userRepository.js - METHOD insert - ',
                `[${now}] - ${error}`,
            );
            throw error;
        };
    }

    async deleteOne(id) {
        try {
            return Users.findByIdAndRemove(id)
                .then(result => {
                    if (!result) {
                        throw new Error('User not found! Please, check user ID and try again.');
                    };
                })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD DELETE - ', `[${now}] - Error: `, error);
        };
    }

    async updateOne(payload) {
        try {
            return Users.findByIdAndUpdate(payload._id, { name: payload.name })
                .then(result => result)
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD UPDATE - ', `[${now}] - Error: `, error);
        };
    };
}   