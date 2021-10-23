//

const mongoose = require('mongoose');
let dbURI = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/badmovies';
mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('error connecting to mongodb >>>', err));


const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
  console.log(db.pass);
})



const userSchema = new mongoose.Schema({

})

const movieSchema = new mongoose.Schema({
  genre_ids: Array,
  id: Number,
  title: String,
  overview: String,
  poster_path: String,
  vote_average: Number,
  release_date: String
})


// Model is a table/database, an instance of model is a document
const UserModel = db.model('Users', userSchema);
const MovieModel = db.model('Movies', movieSchema);

// According to the docs these are functionally equivalent
// const UserModel = mongoose.model('Users', userSchema);
// const MovieModel = mongoose.model('Movies', movieSchema);

module.exports.MovieModel = MovieModel;
module.exports.db = db