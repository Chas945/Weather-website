const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath =path.join(__dirname,'../templates/views') //Alternate way to set path
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath) //Alternate way to set path
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chandrahas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chandrahas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help',
        name: 'Chandrahas'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send ({
            error: 'You must provide a address'
        })
    }

    geoCode(req.query.address, (error, {latitude,longitude,regionCode} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                regionCode,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
} )

app.get('/help/*', (req,res) =>{
    res.render('error404',{
        errormessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error404', {
        errormessage:'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+port +'.')
})