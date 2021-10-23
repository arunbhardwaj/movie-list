//

const mongoose = require('mongoose');
const dbURI = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/badmovies';

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then((e) => console.log(e))
  .catch(err => console.error('error connecting to mongodb >>>', err));


const db = mongoose.connection;

// You could do `mongoose.promise = require('bluebird')` and it'd use bluebird promises
// Makes mongoose use ES6 promises
mongoose.Promise = Promise;

// Listening for errors and connection
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

// TODO;
const userSchema = new mongoose.Schema({

})

const movieSchema = new mongoose.Schema({
  title: String,
  id: Number,
  release_date: String,
  genre_ids: Array,
  overview: String,
  poster_path: String,
  vote_average: Number,
})


// Model is a table/database, an instance of model is a document
const UserModel = db.model('Users', userSchema);
const MovieModel = db.model('Movies', movieSchema);

// According to the docs these are functionally equivalent
// const UserModel = mongoose.model('Users', userSchema);
// const MovieModel = mongoose.model('Movies', movieSchema);

module.exports.MovieModel = MovieModel;
module.exports.db = db