import React from 'react';
import './style.css';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import BerryList from './BerryList';
import BerryDetails from './BerryDetails';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBerry = this.handleClickBerry.bind(this);
    this.state = {
      pokemon: null,
      id: null,
      berry: null,
    };
  }

  // function for handling a click and updating the current pokemon to view
  handleClick(index, pokemon){
    this.setState({id: index, pokemon: pokemon});
  }

  handleClickBerry(index, berry){
    this.setState({id: index, berry: berry});
  }

  render(){
    return <div className="App">
             <Router >
             <Route exact path = "/">
             <Redirect to="/pokemon" />
             </Route>
             <Route path = "/pokemon">
               <PokemonList handleClick={this.handleClick}/>
             </Route>
             <Route path = "/pokemon/:id"
                component={
                (props) =>
                <PokemonDetails
                handleClick={this.handleClick}
                id = {this.state.id || props.match.params.id }
                pokemon = {this.state.pokemon}/>
                }
              />

              <Route path = "/berry">
                <BerryList handleClick={this.handleClickBerry}/>
              </Route>
              <Route path = "/berry/:id"
                 component={
                 (props) =>
                 <BerryDetails
                 handleClick={this.handleClickBerry}
                 id = {this.state.id || props.match.params.id }
                 berry = {this.state.berry}/>
                 }
               />
             </Router>
           </div>;
  }
}

export default App;
