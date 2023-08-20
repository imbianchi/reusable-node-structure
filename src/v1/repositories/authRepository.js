const now = new Date();

module.exports = class AuthRepository {
    constructor() { }

    async insertOne(options) {
        try {
            // return Sessions.insertOne(options)
            //     .then(result => result)
            //     .catch(error => {
            //         throw error;
            //     });
        } catch (error) {
            console.log('[ERROR] - [USER REPOSITORY - METHOD INDEX - ', `[${now}] - Error: `, error)
            throw error;
        }
    };

    async getOne(data) {
        // return await Sessions.find({ _id: data.sessionId })
        //     .then(result => result)
        //     .catch(error => {
        //         throw error
        //     })
    };

    async deleteOne(data) {
        // return await Sessions.findByIdAndDelete({ _id: data.loggedUser.sessionId.toString() })
        //     .then(result => result)
        //     .catch(error => {
        //         throw error;
        //     })
    };
}