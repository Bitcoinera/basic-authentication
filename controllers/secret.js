const Secret = require('../models/secretModel');

module.exports = {
    async saveSecret(secret) {
        await Secret.create(secret, err => {
            if (!err) {
                console.log('secret successfully submitted');
            }
        });
    }
}