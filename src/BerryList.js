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
    fetch('http://pokeapi.co/api/v2/berry').then(res=>res.json())
    .then(response=>{
      console.log("response",response);
      this.setState({
        berries : response.results,
        loading : true,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, loading, berries} = this.state;
    let content ;
    if(fetched){
      content = (
        <div className="pokemon-list">
          {berries.map(
            (berry,index)=>
              <Link to={"/berry/"+(index+1)}
              key={berry.name}
              onClick={() => this.props.handleClick(index + 1, berry)}>
                <Berry id={index+1} berry={berry}/>
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

export default BerryList;
