const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = class SecurityManager {
    constructor() {
        this.crypto = crypto;
        this.jwt = jwt;
    };

    generateToken(encryptedTokenData, expDate = new Date().getTime() + 86400000) {
        const options = {
            algorithm: config.get('security.tokenAlgorithm'),
            expiresIn: expDate,
        };

        const token = this.jwt.sign({
            encryptedData: encryptedTokenData,
        },
            config.get('security.apiTokenKey'),
            options,
        );

        return token;
    };

    decryptToken(token) {
        let decoded = this.jwt.verify(token, config.get('security.apiTokenKey'));
        return decoded.encryptedData;
    };

    sessionDataEncrypt(data) {
        try {
            const jsonData = JSON.stringify(data);

            const cipher = this.crypto.createCipheriv(
                config.get('security.cipherAlgorithm'),
                Buffer.from(config.get('security.apiTokenKey')),
                config.get('security.tokenIV'),
            );

            return Buffer.concat([cipher.update(jsonData), cipher.final()]).toString('hex');
        } catch (error) {
            throw error;
        }
    };

    sessionDataDecrypt(decryptedTokenData) {
        try {
            let decipher = this.crypto.createDecipheriv(
                config.get('security.cipherAlgorithm'),
                Buffer.from(config.get('security.apiTokenKey')),
                config.get('security.tokenIV'),
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
                config.get('security.cipherAlgorithm'),
                Buffer.from(config.get('security.apiTokenKey')),
                config.get('security.tokenIV'),
            );

            return Buffer.concat([cipher.update(password), cipher.final()]).toString('hex');
        } catch (error) {
            console.log(error)
        }
    };

    decryptPassword(password) {
        try {
            const decipher = this.crypto.createDecipheriv(
                config.get('security.cipherAlgorithm'),
                Buffer.from(config.get('security.apiTokenKey')),
                config.get('security.tokenIV'),
            );

            decipher.setAutoPadding(false);

            return Buffer.concat([decipher.update(password), decipher.final()]).toString('hex');
        } catch (error) {
            console.log(error);
        }
    };
}
