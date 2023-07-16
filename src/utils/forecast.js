const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=e19e9ceaf7393b0d0e31759d2abc9c6f&query='+latitude+','+longitude

    request ({url, json: true} , (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if  (body.error) {
            callback('Unable to find location. Try another search',undefined)
        } else {
            callback(undefined,'The tempurature is: '+ body.current.temperature + ', it feels like: '+body.current.feelslike)
        }
    })

}

module.exports = forecast