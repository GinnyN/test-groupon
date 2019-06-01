import React from 'react';

class MovieBox extends React.Component {

    constructor(props) {
        super(props);
        
        this.favArray = JSON.parse(localStorage.getItem('arrayFavorites')) || [];
        this.state = {
            description: '',
            year: '',
            ranting: '',
            released: '',
            runtime: '',
            genre: '',
            actors: '',
            director: '',
            favorite: this.favArray.includes(this.props.movie.imdbID)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.favorite = this.favorite.bind(this);
        this.unfavorite = this.unfavorite.bind(this);
    }

    handleClick(event) {
        fetch("http://www.omdbapi.com/?i="+this.props.movie.imdbID+"&apikey=5cb86053").then(
            results => {
                return results.json();
            }
        ).then(
            results => {
                console.log(results);
                if(results.Response == "True"){
                    this.setState({
                        description: results.Plot,
                        year: results.Year,
                        ranting: results.Rated,
                        released: results.Released,
                        runtime: results.Runtime,
                        genre: results.Genre,
                        actors: results.Actors,
                        director: results.Director
                    });
                }
            }
        )
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    favorite(event){
        localStorage.setItem('arrayFavorites'+this.props.movie.imdbID, JSON.stringify(this.props.movie));
        let favArray = JSON.parse(localStorage.getItem('arrayFavorites')) || [];
        favArray.push(this.props.movie.imdbID);
        localStorage.setItem('arrayFavorites',JSON.stringify(favArray));
        this.setState({
            favorite: true
        })
    }
    unfavorite(event){
        localStorage.removeItem('arrayFavorites'+this.props.movie.imdbID);
        let favArray = JSON.parse(localStorage.getItem('arrayFavorites')) || [];
        let index = favArray.indexOf(this.props.movie.imdbID);
        favArray.splice(index,1);
        localStorage.setItem('arrayFavorites',JSON.stringify(favArray));
        this.setState({
            favorite: false
        })
    }

    render() {
      return (
        <div className="card">
            <img src={this.props.movie.Poster} className="card-img-top" />
            <div className="card-body">
                {this.state.favorite ? 
                    <i className="push-right fas fa-star" onClick={this.unfavorite}></i> :
                    <i className="push-right far fa-star" onClick={this.favorite}></i>
                }
                <h5 className="card-title"><strong>{this.props.movie.Title}</strong> ({this.props.movie.Year})</h5>
                {this.state.year !== '' ?
                    <p className="card-text">
                        {this.state.year} | Rated: {this.state.ranting}<br/>
                        {this.state.released} | {this.state.runtime}<br/>
                        {this.state.genre}<br/>
                        <small>
                            {this.state.description}<br/>
                            Actors: {this.state.actors}<br/>
                            Director: {this.state.director}<br/>

                        </small>
                    </p>
                : null}
                {this.state.year === '' ?
                    <button className="btn btn-info btn-sm" onClick={this.handleClick}>Más info</button>
                : null}
            </div>
        </div>
      );
    }
  }

export default MovieBox;