import React from 'react';
import MovieBox from './moviebox.js';

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        let favArray = JSON.parse(localStorage.getItem('arrayFavorites')) || [];
        this.state = {
            array: favArray
        }
    }

    render() {
      return (
        <div className="col-12">
            <div className="row">
                {this.state.array.map(item => <MovieBox movie={
                    JSON.parse(localStorage.getItem('arrayFavorites'+item))} 
                    key={JSON.parse(localStorage.getItem('arrayFavorites'+item)).imdbID}/>)}
            </div>
        </div>
      );
    }
  }

export default Favorites;