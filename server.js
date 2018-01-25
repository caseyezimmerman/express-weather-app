const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiKey = '5d732aa8a05e36489192a20b094d5d27'
const request = require('request')

app.set("view engine", 'ejs') //setting view engine to ejs
app.use(express.static('public')) //giving this access to our public folder
app.use(bodyParser.urlencoded({extended: true})) //so we can make use of req.body

app.get('/', function(req,res){
	res.render('index',{
		weather:null,
		error:null
	})
})

app.post('/', function(req,res){
	// res.render('index')
	console.log(req.body.city) //can do this bc we gave the input of city name=city
	var city = req.body.city
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	request(url, function(error, response, body){
		if(error){
			res.render('index',{
				weather: null,
				error: "Error"
			})
		}else{
			let	 weather = JSON.parse(body)
			console.log(weather)
			if(weather.main === undefined){
				res.render('index',{
					weather: null,
					error:"Error"
				})
			}else{
				var weatherText = `It's ${weather.main.temp} in ${weather.name} right now.`
				res.render('index',{
					weather: weatherText,
					error: null
				})
			}
		}
	})
})

app.listen(3000, function(){
	console.log("example app listening on port 3000")
})

