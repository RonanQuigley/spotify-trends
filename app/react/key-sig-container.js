import KeySigChart from './components/key-sig-chart';
import React from 'react';

export default class KeySigContainer extends React.Component{
    render(){
        return (
            <div id="react-statistics-container">
                <KeySigChart keySignatures={this.props.statistics.allTime.key} timeRangeLabel="All Time" x="pitchClass" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.sixMonths.key} timeRangeLabel="Six Months" x="pitchClass" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.fourWeeks.key} timeRangeLabel="Four Weeks" x="pitchClass" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.fourWeeks.mode} timeRangeLabel="Four Weeks" x="mode" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.sixMonths.mode} timeRangeLabel="Six Months" x="mode" y="tally"/>
                <KeySigChart keySignatures={this.props.statistics.allTime.mode} timeRangeLabel="All Time" x="mode" y="tally"/>
            </div>
        );
    }
}