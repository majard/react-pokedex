import React from 'react';
import Pokemon from './Pokemon';
import {Link} from 'react-router-dom'


//The Pokemon component will show an individual Pokemon monster
// It shows an image of the Pokemon and
// shows the name of it as well.
class PokemonDetails extends React.Component{
  constructor(props){
    super(props);
    this.getEvolutionChain = this.getEvolutionChain.bind(this);
    this.exploreEvolutionChain = this.exploreEvolutionChain.bind(this);
    this.state = {
      fetched : false,
      evolutionChain: [],
      pokemon: this.props.pokemon,
      //id: this.props.id || this.props.match.params.id,
    };
  }

  componentDidMount(){
    let id = (this.props.id);
    fetch('https://pokeapi.co/api/v2/pokemon-species/'+id)
    .then(res=>res.json())
    .then(response=>{
      this.setState({
        pokemon : response,
        fetched : true
      });
      this.getEvolutionChain(response.evolution_chain.url);
    })
    .catch(err => console.log(err));
  }

  // recursive function to explore all possible evolutions in the evolution
  // chain for the pokemon currently being viewed
  exploreEvolutionChain(evolutionChain){
    if (evolutionChain){
      this.setState({
        evolutionChain : this.state.evolutionChain.concat(evolutionChain.species),
      });
      evolutionChain.evolves_to.map(
        evolutionChain =>
          this.exploreEvolutionChain(evolutionChain)
      );
    }
  }

  // receives the url for requesting to the Poke API the current Pokemon's
  // evolution chain and fetches it from the API
  getEvolutionChain(url){
    fetch(url)
    .then(res=>res.json())
    .then(response=>{
      this.exploreEvolutionChain(response.chain);
    })
    .catch(err => console.log(err));
  }

  render(){
    const {fetched, pokemon, evolutionChain} = this.state;
    // get all current evolutions in the evolution chain and save in an array
    const evolutions = evolutionChain.map(
      (pokemon)=> {
        // This is a regular expression to capture the id of the Pokemon
        // species from the url, and accessing the captured id on the
        // index 1 of the resulting array when we apply match() to the url
        let regex = ".+pokemon-species/(.+)/";
        let index = pokemon.url.match(regex)[1];
        return (
          <Link to={"/pokemon/"+(index)}
          onClick={() => {
            this.props.handleClick(index, pokemon);
          } }
          key={pokemon.name}>
            <Pokemon id={index} pokemon={pokemon}/>
          </Link>
        )
      }
    )
    return fetched?
         (
           <div className="details-wrapper">
              <Pokemon id={this.props.id}
                       pokemon={pokemon}
                       isDetail={true}/>
              <div className="evolutions-container">
                <p className="pokemon-name">
                  {pokemon.name}'s  evolution chain:
                </p>
                <div className="pokemon-evolutions">
                  {evolutions}
                </div>
              </div>
           </div>
         )
          : <div> loading... </div>;
    }
}

export default PokemonDetails;
