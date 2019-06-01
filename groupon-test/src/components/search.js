import React from 'react';
import MovieBox from './moviebox.js';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            movies: [],
            pageNumber: 0,
            nextPage: false,
            lastPage: false
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handlePagePlus = this.handlePagePlus.bind(this);
        this.handlePageMinus = this.handlePageMinus.bind(this);
    }
    handlePagePlus(event){
        let pageNumber = this.state.pageNumber + 1;
        fetch("https://www.omdbapi.com/?s="+this.state.value+"&apikey=5cb86053&page="+pageNumber).then(
            results => {
                return results.json();
            }
        ).then(
            results => {
                console.log(results)
                if(results.Response == "True"){
                    this.setState({
                        movies: results.Search, 
                        pageNumber: pageNumber,
                        nextPage: results.totalResults > (10*pageNumber),
                        lastPage: 10 < (10*pageNumber),
                    });
                }
                console.log(this.state);
            }
        )
    }
    handlePageMinus(event){
        let pageNumber = this.state.pageNumber - 1;
        fetch("https://www.omdbapi.com/?s="+this.state.value+"&apikey=5cb86053&page="+pageNumber).then(
            results => {
                return results.json();
            }
        ).then(
            results => {
                console.log(results)
                if(results.Response == "True"){
                    this.setState({
                        movies: results.Search, 
                        pageNumber: pageNumber,
                        nextPage: results.totalResults > (10*pageNumber),
                        lastPage: 10 < (10*pageNumber),
                    });
                }
                console.log(this.state);
            }
        )
    }

    handleBlur(event) {
        fetch("https://www.omdbapi.com/?apikey=5cb86053&s="+this.state.value).then(
            results => {
                return results.json();
            }
        ).then(
            results => {
                console.log(results)
                if(results.Response == "True"){
                    this.setState({
                        movies: results.Search, 
                        pageNumber: 1,
                        nextPage: results.totalResults > 10,
                        lastPage: false
                    });
                }
            }
        )
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
      return (
        <div className="col-12">
            <div className="input-group mb-2 divInput">
                <input type="text" className="InputSearch form-control form-control-lg" id="inlineFormInputGroup" placeholder="Buscar por Nombre" 
                    value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} />
            </div>
            <div className="row">
                {this.state.movies.map(item => <MovieBox movie={item} key={item.imdbID}/>)}
            </div>
            <div className="row">
                <div className="col-6">    
                    {this.state.lastPage ? <button type="button" className="push-left btn btn-light" onClick={this.handlePageMinus}>
                        <i className="fas fa-arrow-left"></i></button>
                    :null }
                </div>
                <div className="col-6">
                    {this.state.nextPage ? <button type="button" className="push-right btn btn-light" onClick={this.handlePagePlus}><i className="fas fa-arrow-right"></i></button>:null }
                </div>
                
            </div>
        </div>
      );
    }
  }

export default SearchBar;