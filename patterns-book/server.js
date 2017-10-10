const express = require('express')
const app = express()
const path = require('path')
const PORT = 6079
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
// express doesn't handle reading data from forms itself, use body-parser instead

// lets set up a renderer!
const ejs = require('ejs')
app.set('view engine', 'ejs') // requires setting the view engine, whatever that means...

let db

MongoClient.connect('mongodb://admin:123@ds163034.mlab.com:63034/example1', (err, database) => {
	if(err) throw err
	db = database
	console.log(db.s.databaseName)
	app.listen(PORT, console.log(`App listening at http://localhost:${PORT}`))
})

// use to process forms themselves.
app.use(bodyParser.urlencoded({ // urlencoded means transform data into a body object.
	extended: false // no idea
}))



app.get('/', function(req, res) {
	// const indexURI = path.resolve(__dirname + '/index.html')

	// res.sendFile(indexURI)
	// const data =
	let results = {}
	db.collection('sequences').find({}).toArray((err, resultsUnclean) => {
		if (err) throw err
		db.close()
		results.quotes = resultsUnclean
		res.render('views', results)
	})
})



app.post('/upload', (req, res) => {
	db.collection('sequences').save(req.body, (err, result) => {
		if (err) throw err
		console.log(result)
	})
	res.redirect('/')
})
