const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directoty to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Shaun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shaun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message',
        title: 'Help',
        name: 'Shaun'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
        
    }
    geocode(req.query.address, (error, {latitude, longtitude, loc} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
            
        }

        forecast(latitude, longtitude, (error, { current, location }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
        

            res.send({
                forecast: `${current.weather_descriptions[0]}.  It is ${current.temperature} degrees out and feels like ${current.feelslike} degrees.  The humidity is ${current.humidity}% `,
                location: `${location.name}, ${location.region}`,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }

    console.log(req.query)
    res.send({
        product: []
    })  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shaun',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shaun',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
