import React from 'react';
import {VictoryPie, VictoryContainer} from 'victory';

export default class KeySignatures extends React.Component{
  render(){
    return (
      <div>
        <VictoryPie padding={{ left: 80, right: 100 }} colorScale="cool" data={this.props.keySignatures} x="pitchClass" y="allTimeTally"/>
        <VictoryPie padding={{ left: 80, right: 100 }} colorScale="warm" data={this.props.keySignatures} x="pitchClass" y="sixMonthsTally"/>
        <VictoryPie colorScale="heatmap" data={this.props.keySignatures} x="pitchClass" y="fourWeeksTally"/>
      </div>      
    )
  }
}