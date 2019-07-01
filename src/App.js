import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      year: '',
      image: '',
      imdbLink: ''
    };
  }
  
  getMovie = (event) => {
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
          if (data.Response === 'False') {
            console.log(`Error: ${data.Error}`);
            return;
          }
          
          const firstResult = data.Search[0];
          const imdbLink = `https://www.imdb.com/title/${firstResult.imdbID}/`;

          console.log(`Title: ${firstResult.Title}`);
          console.log(`Year: ${firstResult.Year}`);
          console.log(`Poster: ${firstResult.Poster}`);
          console.log(`IMDb Link: ${imdbLink}`);
          
          this.setState({
            title: firstResult.Title,
            year: firstResult.Year,
            image: firstResult.Poster,
            imdbLink: imdbLink
          });
        });
    }

  }
  
  render() {
    const poster = this.state.image && <img src={this.state.image} alt="Poster" />;
    
    return (
      <div>
        <aside id="ui-control">
          <h2>Search for a movie</h2>
          <input onKeyPress={this.getMovie} name="movie" type="text" placeholder="Type a movie name and press Enter" />
        </aside>

        <main>
          <p>The movie information will appear below...</p>
          <article>
            <section id="movie-title">{this.state.title}</section>
            <section id="movie-year">{this.state.year}</section>
            <section id="movie-link">{this.state.imdbLink}</section>
            <section id="movie-image">{poster}</section>
          </article>
        </main>
      </div>
    );
  }
}

export default App;
