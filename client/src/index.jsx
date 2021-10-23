import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [], // VERY WEIRD FUNCTIONALITY, check marks do not stick with title but rather their location in favorite array {deway: "favorites"}
      showFaves: false,
    };

    // you might have to do something important here!
    // I refuse to bind.
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .post(`http://localhost:3000/movies/search/`, {
        genre: genre
      })
      .then(({data}) => this.setState({movies: data.results}))
      .catch(err => console.error(err));
  }

  saveMovie(movie) { // O(n)
    // same as above but do something diff
    axios.post('http://localhost:3000/movies/save', movie)
      .then(() => console.log('saved'))
      .catch(err => console.error('Error while saving >>>', err));

    let index = this.state.favorites.indexOf(movie);
    if (index === -1) {
      this.setState({
        favorites: [...this.state.favorites, movie]
      })
    }
  }

  deleteMovie(movie) { // O(n)
    // splice returns array of elements REMOVED
    axios.delete('http://localhost:3000/movies/save', movie)
      .then(() => console.log('saved'));

    let newFavorites = [...this.state.favorites];
    let index = newFavorites.indexOf(movie);
    if (index > -1) {
      newFavorites.splice(index, 1);
      this.setState({
        favorites: newFavorites
      })
    }
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search getMoviesFromGenre={(genre) => this.getMovies(genre)} swapFavorites={() => this.swapFavorites()} showFaves={this.state.showFaves}/>
          <Movies saveMovie={(e) => this.saveMovie(e)} deleteMovie={(e) => this.deleteMovie(e)} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));