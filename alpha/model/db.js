import mongoose from 'mongoose'
import fs from 'fs'
import RESFile from './restriction-sites.json'
mongoose.connect('mongodb://localhost:27017/primerdesign')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log(`we're connected!`)
});

const exerciseSchema = mongoose.Schema({
  author_id: String,
  haystack: {
    seq: String,
    start_pos: Number,
    end_pos: Number,
    helper_text: String
  },
  plasmid: {
    seq: String,
    helper_text: String
  },
  question: String,
  difficulty: Number,
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

Exercise.findById('5a3bb205da4c3e096cd7d60a').then(x => {
  x.username = 'Paw hat'
  x.author_id = null
  x.save()
})


const resSchema = mongoose.Schema({
  id: Number,
  name: String,
  seq: String,
  cutsForward: Number,
  cutsReverse: Number,
})

const RES = mongoose.model('RE', resSchema)

export { 
  Exercise,
  RES
}