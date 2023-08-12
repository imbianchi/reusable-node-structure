const crypto = require('crypto');
const jwt = require('jsonwebtoken');


module.exports = class SecurityManager {
    constructor() {
        this.crypto = crypto;
        this.jwt = jwt;
    };

    generateToken(encryptedTokenData, expDate = new Date().getTime() + 86400000) {
        const options = {
            algorithm: this.config.data.SECURITY.TOKEN_ALGORITHM,
            expiresIn: expDate
        };

        const token = this.jwt.sign(
            { encryptedData: encryptedTokenData },
            this.config.data.SECURITY.TOKEN_KEY,
            options,
        );

        return token;
    };

    decryptToken(token) {
        let decoded = this.jwt.verify(token, this.config.data.SECURITY.TOKEN_KEY);
        return decoded.encryptedData;
    };

    sessionDataEncrypt(data) {
        try {
            const jsonData = JSON.stringify(data);

            const cipher = this.crypto.createCipheriv(
                this.config.data.SECURITY.CIPHER_ALGORITHM,
                Buffer.from(this.config.data.SECURITY.TOKEN_KEY),
                this.config.data.CRYPTO.TOKEN_IV,
            );

            return Buffer.concat([cipher.update(jsonData), cipher.final()]).toString('hex');
        } catch (error) {
            throw error;
        }
    };

    sessionDataDecrypt(decryptedTokenData) {
        try {
            let decipher = this.crypto.createDecipheriv(
                this.config.data.SECURITY.CIPHER_ALGORITHM,
                Buffer.from(this.config.data.SECURITY.TOKEN_KEY),
                this.config.data.CRYPTO.TOKEN_IV,
            );

            return decipher.update(decryptedTokenData, 'hex', 'utf8');
        }
        catch (error) {
            throw error;
        }
    };

    encryptPassword(password) {
        try {
            const cipher = this.crypto.createCipheriv(
                this.config.data.SECURITY.CIPHER_ALGORITHM,
                Buffer.from(this.config.data.SECURITY.TOKEN_KEY),
                this.config.data.CRYPTO.TOKEN_IV,
            );

            return Buffer.concat([cipher.update(password), cipher.final()]).toString('hex');
        } catch (error) {
            console.log(error)
        }
    };

    decryptPassword(password) {
        try {
            const decipher = this.crypto.createDecipheriv(
                this.config.data.SECURITY.CIPHER_ALGORITHM,
                Buffer.from(this.config.data.SECURITY.TOKEN_KEY),
                this.config.data.CRYPTO.TOKEN_IV,
            );

            decipher.setAutoPadding(false);

            return Buffer.concat([decipher.update(password), decipher.final()]).toString('hex');
        } catch (error) {
            console.log(error);
        }
    };
}
