require('dotenv').config()

module.exports = (req, res, next) => {    
    if (req.body.token !== process.env.TOKEN) {
        return res.status(404);
    }
    next()
}