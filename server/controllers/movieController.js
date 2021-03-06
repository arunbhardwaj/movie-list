const MovieModel = require('../models/movieModel.js').MovieModel;
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const token = require('../../auth.js').token;

const headers = {
  headers: {'Authorization': 'Bearer ' + token}
};

//Return requests to the client
module.exports = {

  postSearch: (req, res) => {
    // ('/movies/search')
    let genre = req.body.genre;
    axios.get('https://api.themoviedb.org/3/discover/movie', {
      headers: {'Authorization': 'Bearer ' + token},
      params: {
        // sort_by: 'vote_average.asc',
        with_genres: genre.id
      }
    })
      .then(results => {
        res.json(results.data).end();
      })
      .catch(err => console.error('Error retrieving movies of genre from api >>>', err));

    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
    // https://image.tmdb.org/t/p/original/poster_path
  },

  getGenres: (req, res) => {
    // ('/movies/genres')
    // make an axios request to get the list of official genres
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', headers)
      .then(results => res.json(results.data).end())
      .catch(err => console.error('Was not able to display results >>>', err));
  },

  // ('/movies/save')
  saveMovie: (req, res) => {
    let movie = req.body;
    MovieModel.findOneAndUpdate({id: movie.id}, movie, {upsert: true})
      .then(() => res.status(201).end());

  },

  // ('/movies/delete')
  deleteMovie: (req, res) => {
    let movie = req.body;
    console.log('deleting ', movie)
    MovieModel.findOneAndDelete({id: movie.id})
      .then(() => res.status(200).send());

  }
}