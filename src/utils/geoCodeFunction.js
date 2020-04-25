

const loadRequest = require("request");

// print lat and long
//new request
//have module request parse as JSON
//print both lat and long
//test your work



// const geoHttpURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
// const geoLocation = 'Poole'
// const geoAccessKeyURL = '.json?access_token=pk.eyJ1IjoidGFsZmllIiwiYSI6ImNrOTFpM2JtNTAwOWUzbW80a2x6MjN2cTAifQ.B2qCnTG1IkXFgpxzeTtQGg'
// const geoVariablesURL = ''
// const geoWeatherURL = geoHttpURL+geoLocation+geoAccessKeyURL

// loadRequest({ url:geoWeatherURL, json: true }, (error, response) => {
// 		if (error) {
// 			console.log("Unable to connect to the location service!")
// 		}
// 		else if (response.body.features.length === 0) {
// 			console.log("Location not present/found")
// 		}
// 		else {
// 		const latitude = response.body.features[0].center[1]
// 		const longitude = response.body.features[0].center[0]


// 		console.log(longitude,latitude )
// 		}



		
// }
// 	)

const geoCode = (geoLocation, callback) => {
		const geoHttpURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
		
		const geoAccessKeyURL = '.json?access_token=pk.eyJ1IjoidGFsZmllIiwiYSI6ImNrOTFpM2JtNTAwOWUzbW80a2x6MjN2cTAifQ.B2qCnTG1IkXFgpxzeTtQGg'
		const geoVariablesURL = ''
		const geoWeatherURL = geoHttpURL+encodeURIComponent(geoLocation)+geoAccessKeyURL

	loadRequest({ url:geoWeatherURL, json: true }, (error, response) => {
		if (error) { //previously we logged to console now we pass it to callback function (second variable in the geoCode constant)
			callback("Unable to connect to the location service!",undefined) // callback (second function) has error and data
		}
		else if (response.body.features.length === 0) {
			callback("Location not present/found", undefined)
		}
		else {
		// const latitude = response.body.features[0].center[1]
		// const longitude = response.body.features[0].center[0]

		// callback(undefined,{longitude,latitude,placename} )
		callback(undefined,{ //sending back an object in the data variable
			latitude: response.body.features[0].center[0]
		,	longitude: response.body.features[0].center[1]
		,	location: response.body.features[0].place_name
		})
		}

		
				})

}


// const httpURL = 'http://api.weatherstack.com/current?'
// const accessKeyURL = 'access_key=ad46775125b107ed60f6cb4997576fde'
// const variablesURL = '&query=37.8267,-122.4233'
// const weatherURL = httpURL+accessKeyURL+variablesURL

// loadRequest({ url:weatherURL, json: true /* set json to true. This means we don't need to parse the JSON*/ }, (error, response) => {
		
// 		if (error) {
// 			console.log("Unable to connect to the weather service!")
// 		}
// 		else if (response.body.error) {
// 			console.log(response.body.error.info)
// 		}
// 		else {
// 		//with json: = true meaning const data = JSON.parse(response.body) then console.log(data.current) can be written as 
// 		console.log("It is currently",response.body.current.temperature,"degrees out. It feels like"
// 				,response.body.current.feelslike,"degrees."	)
// 		}
		
// }
// 	)

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const locationWeather = (longit, latit, callback) => {
		const httpURL = 'http://api.weatherstack.com/current?'
		const accessKeyURL = 'access_key=ad46775125b107ed60f6cb4997576fde'
		const variablesURL = '&query='
		const longAndLat = longit+','+latit
		const weatherURL = httpURL+accessKeyURL+variablesURL+longAndLat

	loadRequest({ url:weatherURL, json: true }, (error, response) => {
		if (error) { //previously we logged to console now we pass it to callback function (second variable in the geoCode constant)
			callback("Unable to connect to the weather service!",undefined) // callback (second function) has error and data
		}
		else if (response.body.error) {
			callback(response.body.error.info, undefined)
		}
		else {
		// const latitude = response.body.features[0].center[1]
		// const longitude = response.body.features[0].center[0]

		// callback(undefined,{longitude,latitude,placename} )
		callback(undefined,{ //sending back an object in the data variable
			Actual: response.body.current.temperature
		,	Feelslike: response.body.current.feelslike
		,	forecast: ("The temperature is ",response.body.current.temperature, "but feels like ", response.body.current.feelslike)
		})
		}

		
				})

}









module.exports = { 
	geoCode: geoCode
	,	locationWeather: locationWeather 
}   




