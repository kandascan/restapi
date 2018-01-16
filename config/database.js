require('dotenv/config')
module.exports = {
    database: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds251827.mlab.com:51827/' + process.env.DB_NAME
}