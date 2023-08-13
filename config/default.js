require('dotenv').config();


module.exports = {
    server: {
        env: process.env.NODE_ENV,
        host: process.env.HOST,
        port: process.env.PORT,
    },
    api: {
        userAgent: process.env.API_USER_AGENT,
        masterName: process.env.API_MASTER_NAME,
        masterUsername: process.env.API_MASTER_USERNAME,
        masterEmail: process.env.API_MASTER_EMAIL,
    },
    db: {
        env: process.env.DB_ENV,
        uriPrefix: process.env.DB_URI_PREFIX,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pswd: process.env.DB_PSWD,
        debug: process.env.DB_DEBUG,
        connString: process.env.DB_CONN_STRING,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        server: process.env.DB_SERVER_NAME,
    },
    security: {
        apiTokenKey: process.env.API_TOKEN_KEY,
        tokenMaxAge: process.env.TOKEN_MAX_AGE,
        tokenAlgorithm: process.env.TOKEN_ALGORITHM,
    }
}