const request = require('request')

const geoCode = (address, callback) => {
    const url ='http://api.positionstack.com/v1/forward?access_key=2dfe89c397c02f58073279e9667d34ed&query='+encodeURIComponent(address)

    request ({url, json: true} , (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if  (body.error) {
            callback('Unable to find location. Try another search',undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                regionCode: body.data[0].region_code
            })
        }
    })

}

module.exports = geoCode