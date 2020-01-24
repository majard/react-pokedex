import React from 'react';

//The Pokemon component will show an individual Pokemon monster
// It shows an image of the Pokemon and
// shows the name of it as well.
class Pokemon extends React.Component{
  render(){
    const pokemon= this.props.pokemon;
    const isDetail = this.props.isDetail;
    return isDetail?
          <section className="detail-view">
            <img alt={pokemon.name}
             className="sprite-image"
             src={process.env.PUBLIC_URL +
                 `/sprites/pokemon/${this.props.id}.png`} />
            <div className="data-wrapper"> {pokemon.name} </div>
          </section>
          :
          <section className="poke-cell">
            <img alt={pokemon.name}
             className="pokemon-sprite"
             src={process.env.PUBLIC_URL +
                 `/sprites/pokemon/${this.props.id}.png`} />
            <div className="data-wrapper"> {pokemon.name} </div>
          </section>;
    }
}

export default Pokemon;
