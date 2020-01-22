import React from 'react';
import './style.css';
import Pokemon from './Pokemon';
import PokemonList from './PokemonList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.getPokemonInfo = this.getPokemonInfo.bind(this);
    this.state = {data: null, pokemon: null};
    this.endpoint = 'https://pokeapi.co/api/v2/pokemon/';
    if (this.props.id) this.endpoint += this.props.id;
  }

  componentDidMount() {
    this.getPokemonInfo();
  }

 async getPokemonInfo(){
     //console.log("this.endpoint info: " + this.endpoint);
     let info = await fetch(this.endpoint)
        .then(res => res.json())
        .then(data => {
          if (data){
            if (data.results){
              this.setState({data: data});

              data.results.map((result, i)=>{
                console.log('result: ');
                console.log(result);
                this.endpoint= result.url;
                this.getPokemonInfo();
                return result;
              })
            }
            if (data.sprites){
              let pokemonList = [data];
              let oldData = this.state.data;
              if (oldData){
                if (oldData.results) this.setState({data: data});
                else if (oldData.name) this.setState({data: pokemonList});
                else {
                  let oldPokemonList = oldData;
                  this.setState({data: oldPokemonList.concat(data)});
                }
              } else {
                  this.setState({data: data});
              }
            }
          }
        })
        .catch(console.log);
     return info
  }

  render(){
    // let data = this.state.data;
    //
    // if(data && this.props.page === 'pokemon/'){
    //   if(this.props.id && data.sprites){
    //     console.log("data in render");
    //     console.log(data);
    //     return <Pokemon pokemon={data} />;
    //   }
    //   if(data.length){
    //     console.log('data.results!!!!!! in render', data);
    //     let results = data.map((pokemon, i)=>{
    //       console.log('pokemon in render: ');
    //       console.log(pokemon);
    //       return <Pokemon pokemon={pokemon} />;
    //     })
    //     return results
    //   }
    // }
    // return null
    return <div className="pokeapp">
           <h1> The Kanto PokeDex! </h1>
            <PokemonList/>
           </div>;
  }
}

export default App;
