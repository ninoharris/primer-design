import express from 'express'

const app = express()
const PORT = 7000


// the following is an example of a middleware function and must either end the req-res cycle or pass on '.next()'
// app.get = HTTP method for which the middleware applies
// '/' = the path (route) for which the middleware applies
// (req, res, next) => {} = Middleware function itself, takes in 3 parameters.
// next = callback function for the next middleware function
app.get('/', (req, res, next) => {
	console.log('Doing a thing')
	next()
})

const myLogger = function(text) {
	return function(req, res, next) {
		console.log(text)
		// res.end('Nope, interception')
		next()
	}
}

const requestTime = function(req, res, next) {
	req.requestTime = Date.now()
	next()
}

// the following code loads the myLogger middleware function before the route to the root path (/).
app.use(myLogger('LOGGEDBEFORE'))

app.use(requestTime)

app.get('/', (req, res, next) => {
	let responseText = 'This page was brought at time: <small>' + Date(req.requestTime) + '</small>'
	res.set('content-type', 'text/html; charset=utf-8')
	res.end(responseText)
	next()
})

app.use(myLogger('LOGGEDAFTER'))

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
})
