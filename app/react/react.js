import React from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend} from 'recharts';
// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { EACCES } from 'constants';
import { currentId } from 'async_hooks';
export default class App extends React.Component {
  constructor(props){
    super(props);
      
  }
  formatLegend(){
    return [
      { id: 'fourWeeksTally', value: 'four weeks', type: 'diamond', color: '#8884d8', height: '2px'},
      { id: 'sixMonthsTally', value: 'six months', type: 'diamond', color: '#82ca9d', height: 12},
    ]
  }
  render(){
    return (    
    <BarChart width={730} height={250} data={this.props.keySignatures}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="pitchClass" height={50}/>
      <YAxis />    
      <Legend wrapperStyle={{ left: 0 }} verticalAlign="bottom" payload={this.formatLegend()}/>
      <Bar dataKey="fourWeeksTally" fill="#0099cc" />
      <Bar dataKey="sixMonthsTally" fill="#8884d8" />
      <Bar dataKey="allTimeTally" fill="#82ca9d" />
    </BarChart>
      // <LineChart width={600} height={300} data={this.props.keySignatures}
      // margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      //   <XAxis dataKey="pitchClass"/>
      //   <YAxis/>
      //   <CartesianGrid strokeDasharray="3 3"/>
      //   <Tooltip/>
      //   <Line type="monotone" dataKey="fourWeeksTally" stroke="#0099cc" activeDot={{r: 8}}/>
      //   <Line type="monotone" dataKey="sixMonthsTally" stroke="#8884d8" activeDot={{r: 8}}/>
      //   <Line type="monotone" dataKey="allTimeTally" stroke="#ff9900" activeDot={{r: 8}}/>
      // </LineChart>

    );
  }
}