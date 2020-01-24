import React from 'react';
import Berry from './Berry';


//The Berry component will show an individual Berry
// It shows an image of the Berry and
// shows the name of it as well as its flavor
class BerryDetails extends React.Component{
  constructor(props){
    super(props);
    this.getBerry = this.getBerry.bind(this);
    this.state = {
      fetched : false,
      berry: this.props.berry,
      flavors: [],
      selectedFlavor: null,
      //id: this.props.id || this.props.match.params.id,
    };
  }

  componentDidMount(){
    let id = (this.props.id);
    let url = 'https://pokeapi.co/api/v2/berry/'+id;
    this.getBerry(url);
  }

  // receives the url for requesting the Poke API the current berry's details
  // and set the berry as the response
  getBerry(url){
    fetch(url)
    .then(res=>res.json())
    .then(response=>{
      this.setState({berry: response, fetched : true});
      this.getflavors(response);
    })
    .catch(err => console.log(err));
  }

  getflavors(berry){
    let flavors = berry.flavors;
    if (!flavors) return
    for (let i = 0; i<flavors.length; i++){
      let flavor = flavors[i];
      this.setState({
              flavors:  this.state.flavors
              .concat(flavor)});
    }
  }

  render(){
    const {fetched, flavors, berry} = this.state;
    return fetched?
         (
           <div className="details-wrapper">
              <Berry id={this.props.id}
                       berry={berry}
                       isDetail={true}/>
              {flavors.map(
                (flavor)=>
                flavor.flavor.name +
                ": " +
                flavor.potency + "\n" )}
           </div>
         )
          : <div> loading... </div>;
    }
}

export default BerryDetails;
