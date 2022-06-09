const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { send } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'James Yu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me', 
        name: 'James Yu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "FAQs",
        name: "James Yu",
        title: 'FAQs'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must enter an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404', 
        name: 'James Yu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404',
        name: 'James Yu'
    })
})

app.listen('3000', () => {
    console.log('App running on port 3000')
})
