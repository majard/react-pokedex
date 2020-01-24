import React from 'react';

//The Berry component will show an individual Berry
// It shows an image of the Berry and
// shows the name of it as well.
class Berry extends React.Component{
  render(){
    const berry= this.props.berry;
    const isDetail = this.props.isDetail;
    return isDetail?
          <section className="detail-view">
            <img alt={berry.name}
             className="sprite-image"
             src={process.env.PUBLIC_URL +
                 `/sprites/items/berries/${berry.name}-berry.png`} />
            <div className="data-wrapper"> {berry.name} </div>
          </section>
          :
          <section className="poke-cell">
            <img alt={berry.name}
             className="pokemon-sprite"
             src={process.env.PUBLIC_URL +
                 `/sprites/items/berries/${berry.name}-berry.png`} />
            <div className="data-wrapper"> {berry.name} </div>
          </section>;
    }
}

export default Berry;
