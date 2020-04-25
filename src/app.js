
const loadPath = require('path')
const loadExpress = require('express')
const loadHbs = require('hbs')
const loadGeoCode = require('./utils/geoCodeFunction.js')
//express is only 1 function

const app = loadExpress()

//define paths for express.config
const fileDirectory = '/Users/timothylittler/GoogleDrive/TALITTLERLTD/Javascript/Node-Course/webServer/public'

const partialsPath = loadPath.join(__dirname,'../handle_bar/partials')


//set up handlebars.config
app.set('view engine', 'hbs') //install handlebers npm package (i hbs) which is an extension for express. This line loads hbs in. Syntax must be exact match
//it expects all the files to live in a folder "views" saved at the root folder. So for this it is webServer as the root
//app.set('views', loadPath.join(__dirname,'../views') //default is views but can set this to be any location for the handlebars docs
app.set('views', loadPath.join(__dirname,'../handle_bar/views')) //changing the location for handlbars

loadHbs.registerPartials(partialsPath)

//get the hanldbars page:
app.get('', (req, res) => { 
		res.render('index', { //render allows us to render the handlebars template. index is the name of the file
		//the second argument injects data into the html doc utilising handlbars
								title: 'Weather app from Node'
							,	name: 'Tim'
							})
} ) 


app.get('/about', (req, res) => { 
		res.render('about', { //render allows us to render the handlebars template. index is the name of the file
		//the second argument injects data into the html doc utilising handlbars
								title: 'About me'
							,	name: 'Tim Littler'
							})
} ) 



app.get('/weather', (req, res) => { 
	if (!req.query.address) {
								return	res.send({ //using return stops the function execution at this point
										error: 'you must provide an address'
									})
							}
	else
	loadGeoCode.geoCode(req.query.address, (error, {latitude, longitude, location, forecast} = {} ) => {
									if (error) {
										res.send({Error: error})
									}
								
								
									else
									loadGeoCode.locationWeather(latitude, longitude, (error, data) => {
										res.send({ //using return stops the function execution at this point
											Location: location
										,	Data: data
										,	forecast
												})
										})
								})



} ) 


app.get('/products', (req, res) => { 
	if (!req.query.team) {
		return	res.send({ //using return stops the function execution at this point
				error: 'you must provide a team'
			})
	}
	console.log(req.query.team)
	res.send( {
				products: []
						})
} ) 


app.get('/help', (req, res) => { 
		res.render('help', { //render allows us to render the handlebars template. index is the name of the file
		//the second argument injects data into the html doc utilising handlbars
								title: 'How you get help'
							,	name: 'Tim Littler'
							})
} ) 

app.use(loadExpress.static(loadPath.join(__dirname,'../public')));

app.use(loadExpress.static(loadPath.join(__dirname,'../public/about.html')));
//or use: app.use(loadExpress.static(fileDirectory));

// this one like the wildcard below will bring back any sub folders to the help page so it will just put you a specific unfound page
app.get('/help/*',(req,res) =>{
	res.render('404', { title: 'That help article is not present'
					,	name: 'Tim Littler'
					,	msg: 'Please give more info'
					})
})

//putting in a 404 page not found display. Using * as a wild card character. Has to come last so every other search for a directoy has been completed
app.get('*',(req,res) =>{
	res.render('404', { title: 'Page not found. Options below:'
					,	name: 'Tim Littler'
					,	msg: 'URL not found, please navigate using the search bar above'
					})
})


app.listen(3000, () => {
	console.log("Server is up on port 3000")
}) //starts up the server and lists on a specific port. port 3000 works on local machine
