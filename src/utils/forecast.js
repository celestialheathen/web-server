const request = require('postman-request')

function forecast(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=f88935de5dfc47a39ad1a66daaad0aa2&query=${latitude},${longitude}&units=f`

    request( {url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weatherstack API.', undefined)
        } else if (body.error) {
            callback('Unable to find that location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.' + ' And the humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast
