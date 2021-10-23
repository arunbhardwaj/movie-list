import React, { useState } from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        { this.props.movies.map((movie, idx) => {
          return (
            <Movie key={idx} saveMovie={this.props.saveMovie} movie={movie}/>
          )
          })
        }
      </ul>
    )
  }
}

const Movie = ({movie, saveMovie = ()=>{}}) => {
  let {poster_path, release_date, title, vote_average} = movie;
  let year = (release_date) ? release_date.slice(0, 4) : 1969;
  let imgUrl = (poster_path)
    ? `https://image.tmdb.org/t/p/original${(poster_path)}`
    : "https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300"

  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <li className="movie_item">
      <img src={imgUrl} />
      <div className="movie_description">
        <h2>{title}</h2>
        <section className="movie_details">
          <div className="movie_year">
            <span className="title">Year</span>
            <span>{year}</span>
          </div>
          <div className="movie_rating">
            <span className="title">Rating</span>
            <span>{vote_average}</span>
          </div>
        </section>
      </div>
      <button onClick={() => saveMovie(movie)}>+Add to Fav</button>
    </li>
  )
}

export default Movies;