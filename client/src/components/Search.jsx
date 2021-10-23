import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      id: '28',
      selected: 'action',
    };
  }

  componentDidMount() {
    this.getGenres()
      .then((results) => this.setState({ genres: results.data.genres }))
      .catch((err) => console.error('error fetching genres >>>', err));
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    return axios.get('http://localhost:3000/movies/genres');
  }

  handleSelectChange(e) {
    // e.persist();
    // console.log(e);
    // console.log(e.target[e.target.selectedIndex]);
    // console.log(e.target[e.target.selectedIndex].attributes.id.value);
    this.setState({
      id: e.target[e.target.selectedIndex].attributes.id.value,
      selected: e.target.value
    });
  }

  render() {
    return (
      <div className="search">

        <button onClick={() => {this.props.swapFavorites()}}>
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>

        <br />
        <br />

        <select value={this.state.selected} onChange={(e) => this.handleSelectChange(e)}>
          {this.state.genres.map((genre, idx) => {
            return (
              <option key={idx} id={genre.id} value={genre.name.toLowerCase()}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={() => this.props.getMoviesFromGenre({id: this.state.id, name: this.state.selected})}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
