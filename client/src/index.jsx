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
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };

    // you might have to do something important here!
    // I refused to bind
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

  saveMovie(movie) {
    // same as above but do something diff
    console.log(movie)
    this.setState({
      favorites: [...this.state.favorites, movie]
    })
  }

  deleteMovie(movie) {
    // same as above but do something diff
    let index = this.state.favorites.indexOf(movie);
    if (index !== -1) {
      this.setState({
        favorites: this.state.favorites.splice(index, 1)
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
          <Movies saveMovie={(e) => this.saveMovie(e)} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));