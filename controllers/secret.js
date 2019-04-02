const Secret = require('../models/secretModel');

module.exports = {
    async saveSecret(secret) {
        await Secret.findOne(secret, (err, secretFound) => {
            if (!err && !secretFound) {
                Secret.create(secret, err => {
                    if (!err) {
                        console.log('secret successfully submitted');
                    }
                });
            } else if (err) {
                console.error(err);
            } else {
                console.log('Secret already exists');
            }
        })
    }
}