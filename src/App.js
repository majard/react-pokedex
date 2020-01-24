import React from 'react';
import './style.css';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import BerryList from './BerryList';
import BerryDetails from './BerryDetails';
import { BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBerry = this.handleClickBerry.bind(this);
    this.handleClickSelectBerryFlavor = this.handleClickSelectBerryFlavor.bind(this);
    this.state = {
      pokemon: null,
      id: null,
      berry: null,
      selectedFlavor: null,
    };
  }

  // function for handling a click and updating the current pokemon to view
  handleClick(index, pokemon){
    this.setState({id: index, pokemon: pokemon});
  }

  handleClickSelectBerryFlavor(flavor, index){
    this.setState({selectedFlavor: index});
  }

  handleClickBerry(index, berry){
    this.setState({id: index, berry: berry});
  }

  render(){
    let possibleFlavors = ['spicy', 'dry', 'sweet', 'bitter', 'sour'];
    const flavorsChoices = possibleFlavors.map((flavor, index) =>
    {
      return(
        <button
          key={flavor}
          onClick= {e=> this.handleClickSelectBerryFlavor(flavor, index)}>
          {flavor}
        </button>
      )
    });
    return <div className="App">
             <Router >
               <Route exact path = "/">
               <Redirect to="/pokemon" />
               </Route>
               <div className="menu">
                 <Link to="/berry"> <button> berries </button> </Link>
                 <Link to="/pokemon"> <button> pokemon </button> </Link>
               </div>
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
                 <div className="menu">
                   Filter berries by flavor:
                   {flavorsChoices}
                 </div>
                 <BerryList
                 handleClick={this.handleClickBerry}
                 selectedFlavor = {this.state.selectedFlavor}
                 />
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
