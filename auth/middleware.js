const { UnauthorizedError } = require('../errors')
require('dotenv').config()

module.exports = (req, res, next) => {
    if (req.body.token !== process.env.TOKEN) {
        throw new UnauthorizedError();
    }
    next()
}