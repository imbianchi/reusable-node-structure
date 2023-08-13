const UsersRepository = require("../repositories/usersRepository");



module.exports = class UsersService {
    constructor() {
        this.userRepository = new UsersRepository();
     }

    async getAll(options) {
        return await this.userRepository.getAll(options)
            .then(result => result)
            .catch(error => {
                // @TODO: CREATE ERROR LOG HERE
                throw error
            })
    }

    async getOne(data) {
        return await this.userRepository.getOne(data)
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