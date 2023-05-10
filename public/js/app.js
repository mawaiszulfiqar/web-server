console.log('From JS file')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit',(e) => {
	e.preventDefault()
	const location = search.value
	fetch('http://64.226.98.204:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
                if (data.error) {
                        messageOne.textContent = data.error
			messageTwo.textContent = ''
                } else {
			messageOne.textContent = data.Location
			messageTwo.textContent = data.Description+data.Temperature
			//console.log(data.Location)
                        //console.log(data.Description)
                        //console.log(data.Temperature)
                }
        })
})
	console.log(location)
})
