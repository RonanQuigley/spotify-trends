import React from 'react';
// import {BarChart, CartesianGrid, XAxis, YAxis, Bar,} from 'recharts';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { EACCES } from 'constants';
import { currentId } from 'async_hooks';
export default class App extends React.Component {
  constructor(props){
    super(props);  
  }
  render(){
    return (    

      // <BarChart width={1000} height={500} data={this.props.keySignatures}>
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" />
      //   <YAxis />        
      //   <Bar dataKey="tally" fill="#8884d8" />        
      // </BarChart>
      <LineChart width={600} height={300} data={this.props.keySignatures}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="tally" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>

    );
  }
}