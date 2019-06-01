import React from 'react';
import SearchBar from './search.js';
import Favorites from './favoritos.js';

class NavBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        busqueda: true
      }
      this.busqueda = this.busqueda.bind(this);
      this.favorito = this.favorito.bind(this);
    }
    busqueda(event){
      this.setState({busqueda: true});
    }
    favorito(event){
      this.setState({busqueda: false});
    }
    render() {
      return (
        <div>
          <nav className="NavBar navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">Búsqueda de Películas</a>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#" onClick={this.busqueda}>Búsqueda</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" onClick={this.favorito}>Favoritos</a>
                  </li>
                </ul>
              </div>
          </nav>
          <div className="container">
            {this.state.busqueda? <SearchBar/> : <Favorites/>}
          </div>
        </div>
      );
    }
  }

export default NavBar;