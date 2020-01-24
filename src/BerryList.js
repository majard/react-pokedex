import React from 'react';
import Berry from './Berry';
import { Link } from 'react-router-dom'


class BerryList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      berries : [],
      fetched : false,
      loading : false,
    };
  }

  // fecthes the pokemon from the current region in the PokeAPI
  componentDidMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/berry/?limit=64').then(res=>res.json())
    .then(response=>{
      let results = response.results;
      results.map(berry => this.getBerry(berry.url))
    });
  }

  // receives the url for requesting the Poke API the current berry's details
  // and set the berry as the response
  getBerry(url){
    fetch(url)
    .then(res=>res.json())
    .then(response=>{
      this.setState({
        berries: this.state.berries.concat(response), fetched : true
      });
    })
    .catch(err => console.log(err));
  }

  render(){
    const {fetched, loading, berries} = this.state;
    let content ;
    if(fetched){
      content = (
        <div className="pokemon-list">
          {berries.map(
            (berry,index)=>
            {
              let selectedFlavor = this.props.selectedFlavor;
              if (selectedFlavor === null ||
                 ( (selectedFlavor != null) &&
                   (berry.flavors[selectedFlavor].potency > 0) )
                 ){

                return (
                <Link to={"/berry/"+(index+1)}
                key={berry.name}
                onClick={() => this.props.handleClick(index + 1, berry)}>
                  <Berry id={index+1} berry={berry}/>
                </Link>)
              }
              else return null
            }
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

export default BerryList;
