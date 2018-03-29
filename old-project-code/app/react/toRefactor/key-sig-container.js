// import KeySigChart from './components/key-sig-chart';
import PieChartUI from './components/pie-chart-ui';
import React from 'react';
import Utilities from './utilities';

export default class KeySigContainer extends React.Component{

    constructor(){
        super();
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div id="react-statistics-container">
                {/* <KeySigChart keySignatures={this.props.statistics.allTime.key} timeRangeLabel="All Time" x="pitchClass" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.sixMonths.key} timeRangeLabel="Six Months" x="pitchClass" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.fourWeeks.key} timeRangeLabel="Four Weeks" x="pitchClass" y="tally"/> */}
                {/* <PieChartUI/>
                 */}
                 
            </div>
        );
    }
}