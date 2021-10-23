const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');
const token = require('../../auth.js').token;

const headers = {
  headers: {'Authorization': 'Bearer ' + token}
};

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', headers)
      .then(results => res.json(results.data).end())
      .catch(err => console.error('Was not able to display results >>>', err));
  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}