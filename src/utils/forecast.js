const request = require('request')

const forecast = (latitude, longtitude, callback) => {
//    const url = 'http://api.weatherstack.com/current?access_key=f1ca8e8b7f39d683aea52e58afea7732&query=37.8267,-122.4233'
    const url = `http://api.weatherstack.com/current?access_key=f1ca8e8b7f39d683aea52e58afea7732&query=${latitude},${longtitude}`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) { 
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                current: body.current,
                location: body.location
            })
        }

    })
}

module.exports = forecast