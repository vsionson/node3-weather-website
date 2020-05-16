const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnNpb244OCIsImEiOiJjazlwMWhib3AwNHJpM25wODg3Y3A4dGY4In0.BV2PdjhYZHKz5XQ_qEbeGg&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) { 
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode