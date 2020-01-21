import React from 'react';
import './style.css';

//The Pokemon component will show an individual Pokemon monster
// It shows an image of the Pokemon and
// shows the name of it as well.
class Pokemon extends React.Component{
  render(){
    const pokemon= this.props.pokemon;
    return <div className="pokemon--species">
            <div className="pokemon--species--container">
              <div className="pokemon--species--sprite">
                <img src={process.env.PUBLIC_URL + `/sprites/${pokemon.id}.png`} />
              </div>
              <div className="pokemon--species--name"> {pokemon.name} </div>
            </div>
          </div>;
    }
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.getPokemonInfo = this.getPokemonInfo.bind(this);
    this.state = {data: null, pokemon: null};
    this.endpoint = 'https://pokeapi.co/api/v2/' + this.props.page;
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
            console.log("data in getPokemonInfo");
            console.log(data);
            if (data.results){
              this.setState({data: data});

              console.log('data.results in getPokemonInfo!!!!!!');
              data.results.map((result, i)=>{
                console.log('result: ');
                console.log(result);
                this.endpoint= result.url;
                this.getPokemonInfo();
                return result;
              })
            }
            if (data.sprites){
              console.log("sprites in getPokemonInfo");
              let pokemonList = [data];
              let oldData = this.state.data;
              if (oldData){
                console.log("oldData", oldData);
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
     console.log("info");
     console.log(info);
     return info
  }

  render(){
    let data = this.state.data;

    if(data && this.props.page === 'pokemon/'){
      if(this.props.id && data.sprites){
        console.log("data in render");
        console.log(data);
        return <Pokemon pokemon={data} />;
      }
      if(data.length){
        console.log('data.results!!!!!! in render', data);
        let results = data.map((pokemon, i)=>{
          console.log('pokemon in render: ');
          console.log(pokemon);
          return <Pokemon pokemon={pokemon} />;
        })
        return results
      }
    }
    return null
  }
}

export default App;
