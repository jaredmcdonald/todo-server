var fs = require('fs')
,   path = require('path')
,   dataFile = path.join(__dirname, '../data/data.json')

function getJSON (callback) {
    fs.readFile(dataFile, function (err, data) {
        if (err) {
            throw err
            return false
        }
        callback(JSON.parse(data.toString()))
    })
}

function saveJSON (json, callback) {
    fs.writeFile(dataFile, JSON.stringify(json), function (err) {
        callback(err) // will be null if no error
    })
}

module.exports = {
    get : function (callback, id) {
        getJSON(function (json) {
            if (id === undefined) {
                callback(json)
            } else {
                callback(json[id] || {
                    status : 'error',
                    error : 'id not found'
                })
            }
        })
    },
    delete : function (id, callback) {
        getJSON(function (json) {
            if (json[id] === undefined) {
                callback('can\'t delete: id does not exist')
                return false
            }
            json.splice(id, 1)
            saveJSON(json, callback)
        })
    },
    edit : function (id, obj, callback) {
        getJSON(function (json) {
            if (json[id] === undefined) {
                callback('can\'t edit: id does not exist')
                return false
            }
            json[id] = obj
            saveJSON(json, callback)
        })
    },
    create : function (obj, callback) {
        getJSON(function (json) {
            var id = json.push(obj) - 1
            saveJSON(json, function (err) {
                callback(err, id)
            })
        })
    }
}
