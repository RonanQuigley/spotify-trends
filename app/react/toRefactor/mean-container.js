import MeanChart from "./components/mean-chart";
import React from "react";
import Utilities from './utilities';

export default class MeanContainer extends React.Component {
  constructor() {
    super();
    let initData = [{ x: 1, y: 0 }, { x: 2, y: 200 }];
    this.state = {
      fetchCompleted: false,
      data: initData
    };
  }

  componentDidMount() {
    Utilities.getDataFromServer().then(serverData => this.updateState(serverData));
  }

  updateState(serverData) {
    this.setState({
      data: serverData.meanResults,
      fetchCompleted: true
    });
  }

  generateCharts(obj) {
    let thing = Object.assign(...Object.keys(obj).map(k => {
        let output = Object.keys(obj[k]).reduce((accumulator, currentKey, index) => {
          let currentObj = obj[k];
          accumulator[currentKey] = <MeanChart key={index} value={currentObj[currentKey]} maxValue={1}/>;
          return accumulator; 
        }, {})
        return {[k] : output};
      }))

    console.log(thing);

    return null;
    
    // let arr = [];
    // for (let i in obj) {
    //   let currentObj = obj[i];
    //   let output = Object.keys(currentObj).map((k, index) => {
    //     return (
    //       <MeanChart
    //         key={"" + i + "," + index}
    //         value={currentObj[k]}
    //         maxValue={1}
    //       />
    //     );
    //   });
    //   arr.push(output);
    // }
    // return arr;
    // console.log(arr);
  }

  render() {
    let id = "react-mean";
    if (this.state.fetchCompleted) 
    {
      return <div id={id}>{this.generateCharts(this.state.data)}</div>;
    } 
    else 
    {
      return <div id={id} />;
    }
  }
}
