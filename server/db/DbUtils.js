const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const GenId = require("../utils/SnowFlake")

var db = new sqlite3.Database(path.join(__dirname, "blog.sqlite3"))
const genid = new GenId({ WorkerId: 1 })

db.async = {}
//避免回调地狱，封装成promise 把异步处理改为同步

db.async.all = (sql, params) => {
    return new Promise((resolve, reject) => {    //resolve为执行完毕成功后的回调  reject是拒绝的回调
        db.all(sql, params, (err, rows) => {
            resolve({ err, rows })
        })
    })
}

db.async.run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, rows) => {
            resolve({ err, rows })
        })
    })
}

module.exports = { db, genid }
