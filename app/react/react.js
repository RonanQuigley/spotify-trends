import React from "react";
import {
  VictoryPie,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme
} from "victory";

export default class KeySignatures extends React.Component {
  render() {
    return (
      <div>
        <svg style={{ overflow: "visible" }} viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            theme={VictoryTheme.material}
            data={this.props.keySignatures}
            x="pitchClass"
            y={this.props.timePeriod}
            width={400}
            height={400}
            innerRadius={68}
            padAngle={1.5}
            style={{ labels: { fontSize: 12, fill: "black" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200}
            y={200}
            text="Pie!"
          />
        </svg>
      </div>
    );
  }
}
