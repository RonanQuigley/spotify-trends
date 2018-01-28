import React from 'react';

export default class App extends React.Component {
  constructor(){
    super();    
  }
  render(){
    return <h1>{Object.values(this.props.audioFeatures.allTime)[0].acousticness}</h1>
  }
}