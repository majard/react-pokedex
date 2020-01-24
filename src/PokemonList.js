import React from 'react';
import Pokemon from './Pokemon';
import { Link } from 'react-router-dom'


//The PokemonList component shows nothing when it mounts for the first time.
//But right before it mounts on to the DOM, it makes an
//API call to fetch the first 151 Pokemon from the API and
//then displays them using the Pokemon Component

class PokemonList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }

  // fecthes the pokemon from the current region in the PokeAPI
  componentDidMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/pokemon?limit=151').then(res=>res.json())
    .then(response=>{
      this.setState({
        species : response.results,
        loading : true,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, loading, species} = this.state;
    let content ;
    if(fetched){
      content = (
        <div className="pokemon-list">
          {species.map(
            (pokemon,index)=>
              <Link to={"/pokemon/"+(index+1)}
              key={pokemon.name}
              onClick={() => this.props.handleClick(index + 1, pokemon)}>
                <Pokemon id={index+1} pokemon={pokemon}/>
              </Link>
          )}
        </div>);
    }else if(loading && !fetched){
        content = <p> Loading ...</p>;
    }
    else{
      content = <div/>;
    }
    return content
  }
}

export default PokemonList;
