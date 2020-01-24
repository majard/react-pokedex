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
    this.updateURL = this.updateURL.bind(this);
    this.getPokemonList = this.getPokemonList.bind(this);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
      next: null,
      previous: null,
      offset: 1,
    };
  }

  // fecthes the pokemon from the current region in the PokeAPI
  componentDidMount(){
    this.setState({
      loading : true
    });
    this.getPokemonList('http://pokeapi.co/api/v2/pokemon?limit=151');
  }

  getPokemonList(url){
    fetch(url).then(res=>res.json())
    .then(response=>{
      console.log("response.results", response);
      this.setState({
        species : response.results,
        loading : true,
        fetched : true,
        next : response.next,
        previous: response.previous,
      });
    });
  }

  // updates the state of the url, and then call getPokemonList to build
  // the new list, as the second argument to setState
  updateURL(navigation){
    console.log("url", navigation);
    if (navigation === "previous"){
      let url = this.state.previous;
      this.getPokemonList(url);
      this.setState({fetched: false,
                     offset: this.state.offset - 151,
                   });
    } else if (navigation === "next") {
      let url = this.state.next;
      this.getPokemonList(url);
      this.setState({fetched: false,
                     offset: this.state.offset + 151,
                   });
    }
  }

  render(){
    const {fetched, loading, species, offset} = this.state;
    let content ;
    let nextButton, previousButton;
    console.log("species: ",species);

    if (this.state.previous){
      previousButton = <button
                      onClick={() => this.updateURL("previous")}>
                        Previous
                      </button>;
    }
    if (this.state.next) {
      nextButton = <button
                    onClick={() => this.updateURL("next")}>
                      Next
                   </button>;
    }
    if(fetched){
      content = (

        <div className="pokemon-list-container">
          <div className="nav-button-container"> 
            {previousButton} {nextButton}
          </div>

          <div className="pokemon-list">
            {species.map(
              (pokemon,index)=>
                <Link to={"/pokemon/"+(index+offset)}
                key={pokemon.name}
                onClick={() => this.props.handleClick(index + offset, pokemon)}>
                  <Pokemon id={index+offset} pokemon={pokemon}/>
                </Link>
            )}
          </div>
        </div>
      );
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
