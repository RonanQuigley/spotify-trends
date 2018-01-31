import React from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Bar} from 'recharts';
export default class App extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    return (    
      <BarChart width={500} height={500} data={this.props.audioFeatures}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />        
        <Bar dataKey="key" fill="#8884d8" />        
      </BarChart>
    );
  }
}