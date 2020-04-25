console.log("client side JS is loaded")



const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')

const message1 = document.querySelector('#message-1')// for an id value we use # for a class we use .
const message2 = document.querySelector('#message-2')// for an id value we use # for a class we use .

message1.textContent = ''
message2.textContent = ''

//add an event listener
weatherForm.addEventListener('submit',(event) => {
    event.preventDefault() //This will prevent default behaviour which is to refresh the browser.
    const lookup = searchForm.value

    message1.textContent = 'Loading' //setting the paragraph once the form is submitted
    message2.textContent = '' //setting the paragraph once the form is submitted
    //fetch is a browser based API - only available for web servers running in client side JS
    fetch('http://localhost:3000/weather?address='+ lookup).then((response) => { //fetch first then do the .then command
    response.json().then((data) => {//call it what you want, we called it data
                                    if (data.error) {
                                        message1.textContent = 'Error in finding the location and weather: '+ data.error
                                        return
                                    }
                                    else
                                    message1.textContent = ''
                                    message2.textContent = data.location
                                    return
                                    })
                                                                                })
})
 
