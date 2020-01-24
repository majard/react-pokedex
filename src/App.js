import React from 'react';
import './style.css';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      pokemon: null,
      id: null,
    };
  }

  // function for handling a click and updating the current pokemon to view
  handleClick(index, pokemon){
    this.setState({id: index, pokemon: pokemon});
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
             </Router>
           </div>;
  }
}

export default App;
