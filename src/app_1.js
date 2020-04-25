
const loadPath = require('path')
const loadExpress = require('express')
//express is only 1 function

const app = loadExpress()

const fileDirectory = '/Users/timothylittler/GoogleDrive/TALITTLERLTD/Javascript/Node-Course/webServer/public'


app.set('view engine', 'hbs') //install handlebers npm package (i hbs) which is an extension for express. This line loads hbs in. Syntax must be exact match
//it expects all the files to live in a folder "views" saved at the root folder. So for this it is webServer as the root


//get the hanldbars page:
app.get('', (req, res) => { 
		res.render('index', { //render allows us to render the handlebars template. index is the name of the file
		//the second argument injects data into the html doc utilising handlbars
								title: 'Weather app from Node'
							,	name: 'Tim'
							})
} ) 


app.use(loadExpress.static(loadPath.join(__dirname,'../public')));

app.use(loadExpress.static(loadPath.join(__dirname,'../public/about.html')));
//or use: app.use(loadExpress.static(fileDirectory));

// .get tells the server what to do when the user tries to get a specific resource at a URL
app.get('', (req, res) => { //fist bit is the sub page (e.g. contact-us or about from examples bloew)
// e.g. urls
// app.com (this is what is used in the above example)
// app.com/contact-us
// app.com/about

// this code is now replaced:
res.send('Hello Express')

		

} ) 
//req = request and res = respone

// app.get('/help', (req, res) => { 

// 	//	res.send('Here is the help page')

// } ) 

// app.get('/about', (req, res) => { 

// 	//	res.send('<h1>About</h1>')

// } ) 

// app.get('/weather', (req, res) => { 

// 		res.send({
// 			'Location':'Poole'
// 		,	'Temperature': '50 degrees'
// 		})

// } ) 

app.listen(3000, () => {
	console.log("Server is up on port 3000")
}) //starts up the server and lists on a specific port. port 3000 works on local machine
