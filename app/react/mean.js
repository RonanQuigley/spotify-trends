import React from 'react';
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class MeanChart extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded : false
    }
  }

  componentWillMount(){
    
    if(Object.keys(this.props).length === 0 && this.props.constructor === Object){    
      fetch('react').then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({percent: 0, loaded: true, data: this.getData(0, response.maxValue)})      
      })
    }
    else{
      this.setState({percent: 0, loaded: true, data: this.getData(0, this.props.maxValue)})
    }    
  }

  componentDidMount() {
    let finishedPercent = 25;
    this.timeout = window.setTimeout(() => {
      this.setState({
        percent : finishedPercent, data: this.getData(finishedPercent, 100)
      })
    }, 2000)
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  getData(percent, max) {
    return [{ x: 1, y: percent }, { x: 2, y: max - percent }];
  }

  render() {
    if(this.state.loaded){
      return (
        <div>
          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <VictoryPie
              standalone={false}
              animate={{ duration: 1000 }}
              width={400} height={400}
              data={this.state.data}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: { fill: (d) => {
                  const color = d.y > 30 ? "green" : "red";
                  return d.x === 1 ? color : "transparent";
                }
                }
              }}
            />
            <VictoryAnimation duration={1000} data={this.state}>
              {(newProps) => {
                return (
                  <VictoryLabel
                    textAnchor="middle" verticalAnchor="middle"
                    x={200} y={200}
                    text={`${Math.round(newProps.percent)}%`}
                    style={{ fontSize: 45 }}
                  />
                );
              }}
            </VictoryAnimation>
          </svg>
        </div>
      );
    }
    else{
      return null;
    }
  }

}
  