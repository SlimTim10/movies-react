import React from 'react';
import './App.css';

class App extends React.Component {
  getMovie = event => {
    if (event.key === 'Enter') {
      const apiKey = '';
      const rootEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}`;
      
      const searchWord = event.target.value;

      const endpoint = rootEndpoint
            + `&s=${searchWord}`;
      console.log('Endpoint:', endpoint);

      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const firstResult = data.Search[0];

          const imdbLink = `https://www.imdb.com/title/${firstResult.imdbID}/`;

          console.log(`Title: ${firstResult.Title}`);
          console.log(`Year: ${firstResult.Year}`);
          console.log(`Poster: ${firstResult.Poster}`);
          console.log(`IMDb Link: ${imdbLink}`);
        });
    }

  }
  
  render() {
    return (
      <div>
        <aside id="ui-control">
          <h2>Search for a movie</h2>
          <input onKeyPress={this.getMovie} name="movie" type="text" placeholder="Type a movie name and press Enter" />
        </aside>

        <main>
          <p>The movie information will appear below...</p>
          <article>
            <section id="movie-title"></section>
            <section id="movie-year"></section>
            <section id="movie-link"></section>
            <section id="movie-image"></section>
          </article>
        </main>
      </div>
    );
  }
}

export default App;
