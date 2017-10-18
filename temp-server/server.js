import express from 'express'
import bodyParser from 'body-parser'
import pug from 'pug'
const app = express()
const PORT = 5090
const MongoClient = require('mongodb').MongoClient
// $oid
let db

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api', function(req, res) {
	var cursor = db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)
	})
	res.sendFile(__dirname + '/index.html')
})

app.post('/api/upload-plasmid', function(req, res) {
	// console.log(req.body)
	// res.redirect('/api')
	db.collection('plasmids').save({
		...req.body,
		author: 'Nino'
	}, (err, result) => {
		// console.log('result:', result)
	if (err) return console.log(err)

	console.log('saved to database')
	res.redirect('/api')
})
})

app.get('/test-plasmid/:id', function(req, res) {
	const id = req.params.id
	let locals
	db.collection('quotes').find().toArray(function(err, results) {
		locals = results
	})
	res.render('views', locals)
})



MongoClient.connect('mongodb://admin:pass1@ds121565.mlab.com:21565/temp-server', (err, database) => {
	if (err) return console.log(err)
  db = database
	app.listen(PORT, function() {
		console.log(`Server listening on ${PORT}`)
	})
})
