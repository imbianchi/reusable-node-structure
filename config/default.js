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
        masterPswd: process.env.API_MASTER_PASSWORD,
    },
    db: {
        dialect: process.env.DB_DIALECT,
        development: {
            host: process.env.DB_DEV_HOST,
            port: process.env.DB_DEV_PORT,
            pswd: process.env.DB_DEV_PSWD,
            debug: process.env.DB_DEV_DEBUG,
            connString: process.env.DB_DEV_CONN_STRING,
            user: process.env.DB_DEV_USER,
            name: process.env.DB_DEV_NAME,
            server: process.env.DB_DEV_SERVER_NAME,
        },
        acceptance: {
            host: process.env.DB_ACC_HOST,
            port: process.env.DB_ACC_PORT,
            pswd: process.env.DB_ACC_PSWD,
            debug: process.env.DB_ACC_DEBUG,
            connString: process.env.DB_ACC_CONN_STRING,
            user: process.env.DB_ACC_USER,
            name: process.env.DB_ACC_NAME,
            server: process.env.DB_ACC_SERVER_NAME,
        },
        production: {
            host: process.env.DB_PROD_HOST,
            port: process.env.DB_PROD_PORT,
            pswd: process.env.DB_PROD_PSWD,
            debug: process.env.DB_PROD_DEBUG,
            connString: process.env.DB_PROD_CONN_STRING,
            user: process.env.DB_PROD_USER,
            name: process.env.DB_PROD_NAME,
            server: process.env.DB_PROD_SERVER_NAME,
        }
    },
    security: {
        apiTokenKey: process.env.API_TOKEN_KEY,
        tokenMaxAge: process.env.TOKEN_MAX_AGE,
        tokenAlgorithm: process.env.TOKEN_ALGORITHM,
        cipherAlgorithm: process.env.CIPHER_ALGORITHM,
        tokenIV: process.env.TOKEN_IV,
    }
}