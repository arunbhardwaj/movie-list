//

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

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

})


// Model is a
const UserModel = db.model('Users', userSchema);
const MovieModel = db.model('Movies', movieSchema);

// According to the docs these are functionally equivalent
// const UserModel = mongoose.model('Users', userSchema);
// const MovieModel = mongoose.model('Movies', movieSchema);


module.exports.db = db