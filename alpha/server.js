import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const router = express.Router({ mergeParams: true, })

import { Exercise, RES } from './model/db'
const PORT = process.env.API_PORT || 3005


app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json()) // look for json in the request body

// Prevent errors from cross-origin resource sharing
// Set headers to allow CORS using middleware
app.use((req, res, next) => {
res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Credentials", "true");
 res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
 res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

// Remove caching so we get the most recent version of the exercises
  res.setHeader('cache-control', 'no-cache')
  next()
})

// // Set route path and initialise API
// router.get('/', (req, res, next) => {
//   res.json({ status: 'API initialised!'})
// })

// router.route('/')

// router.route('/exercises/:id')
//   .get((req, res) => {
//     const { id } = req.params
//     Exercise.find({_id: id}, (err, exercises) => {
//       if (err) res.status(500).send(err)
//       res.json(exercises)
//     })
//   })

// app.use('/api', router)
app.post('/exercise', (req, res, next) => {
  const data = req.body
  const id = Exercise.create(data, (err, exercise) => {
    if(err) res.sendStatus(500)
    const { _id } = exercise // get assigned id
    res.status(200).send({
      _id
    })
  })
})

app.get('/exercise/:id', (req, res, next) => {
  console.log('Exercise asked for:', req.params.id)
  Exercise.findById(req.params.id).then(exercise => {
    console.log('Request done:', exercise)
    res.json(exercise)
  })
  // .catch(() => res.sendStatus(400))
})
.delete('/exercise/:id', (req, res, next) => {
  Exercise.remove({ _id: req.params.id}).then(res.sendStatus(200))
})
.put('/exercise/:id', (req, res, next) => {
  console.log('put made!!', req.params.id)
  Exercise.findByIdAndUpdate(req.params.id, req.body).then(exercise => {
    console.log('Updated id', req.params.id, 'with:', req.body)
    console.log('Output is:', exercise)
    res.sendStatus(200)
  }).catch(e => {
    console.log(e)
  })
})

app.get('/exercise', (req, res, next) => {
  Exercise.find().then(data => {
    res.json(data)
  })
})

app.listen(PORT, () => {
  console.log(`api running on port ${PORT}`)
})




