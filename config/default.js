require('dotenv').config()


module.exports = {
    server: {
        env: process.env.NODE_ENV,
        host: process.env.HOST,
        port: process.env.PORT,
    },
    db: {
        env: process.env.DB_ENV,
        host: process.env.DB_HOST,
        debug: process.env.DB_DEBUG,
        connString: process.env.DB_CONN_STRING,
        password: process.env.DB_PSWD,
        user: process.env.DB_USER,
        name: process.env.DB_NAME,
        server: process.env.DB_SERVER_NAME,
    },
    plugins: []
}