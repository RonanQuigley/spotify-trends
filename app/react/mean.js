import React from 'react';
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory';

// NOTE - YOU NEED TO PROVIDE THE PERCENTAGE DATA TO HYDRATE ON CLIENT SIDE 
// OTHERWISE YOU'LL GET AN UNDEFINED

export default class MeanChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0, data: this.getData(0)
    };
  }

  componentDidMount() {
    this.setState({
      percent, data: this.getData(percent)
    });
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 60 - percent }];
  }

  render() {
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
            startAngle={-90}
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
  }
  