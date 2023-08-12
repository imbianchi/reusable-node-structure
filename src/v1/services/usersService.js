const path = require('path');
const UserRepository = require('../repository/userRepository');


module.exports = class UserServices {
    constructor() { }

    async getAll(options) {
        return await this.userRepository.getAll(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }

    async getOne(options) {
        return await this.userRepository.getOne(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }

    async deleteOne(options) {
        return await this.userRepository.deleteOne(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }

    async updateOne(options) {
        return await this.userRepository.updateOne(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }

    async createOne(options) {
        return await this.userRepository.createOne(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }
}