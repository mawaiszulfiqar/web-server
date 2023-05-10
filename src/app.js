const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')


const app = express()

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views')
const partialPath = path.join(__dirname,'../partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
        res.render('index',{
		title: 'Home',
		Name: 'Awais Rao'
	})
})

app.get('/help', (req, res) => {
        res.render('help',{
		helpmsg: 'This is a help msg',
		title: 'Help',
                Name: 'Awais Rao'
	})
})

app.get('/weather', (req, res) => {
        if(!req.query.address){
		return res.send({error: 'Please provide address'})
	}
	const url = 'http://api.weatherstack.com/current?access_key=d201901c9d044955d53f85256894c9c4&query='+req.query.address

request({url: url, json: true}, (error, response) => {
        if(error){
                return res.send('Unable to connect to weather service')
        } else if(response.body.error){
                const {code, info} = response.body.error
                return res.send({Code: code, Info: info})
        } else {
        //const data = JSON.parse(response.body)
        const {name, region, country}  = response.body.location
        const {weather_descriptions: wedesc, temperature: temp, feelslike} = response.body.current
        return res.send({ Location: name+', '+region+', '+country, Description: wedesc, Temperature: 'It is currently '+temp+' degrees out. It feels like '+feelslike+ ' out.'})
		//callback(undefined,'Location:'+name+', '+region+', '+country+'\n'+wedesc+'. It is currently '+temp+' degrees out. It feels like '+feelslike+ ' out.')
        //callback(response)
        }


})
	//res.send({Address: req.query.address,
	//	forcast: 'It is snowing outside',
	//	location: 'Philadelphia'})
})

app.get('/help/*', (req, res) => {
        res.render('404', {
		error: 'Help Article Not Found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		error: '404: Not Found'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})
