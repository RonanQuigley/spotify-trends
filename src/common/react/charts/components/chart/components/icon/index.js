import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// use direct imports for tree shaking
import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import randomID from 'uuid/v4';

export default class Icon extends PureComponent {
    static propTypes = {
        popularity: PropTypes.number.isRequired
    };

    generateIcon = rating => {
        let result = [];
        let starHalf = false;
        let length = rating - 1;
        if (rating % 1 !== 0) {
            starHalf = true;
            length = Math.floor(rating);
        }
        for (let i = 0; i < length; i++) {
            result.push(<Star key={randomID()} />);
        }
        // for the last element, or if there is only half a star required, we check after the loop
        if (starHalf === true) {
            result.push(<StarHalf key={randomID()} />);
            return result;
        } else {
            result.push(<Star key={randomID()} />);
            return result;
        }
    };

    render() {
        const { popularity } = this.props;
        const icon = this.generateIcon(popularity);
        return <div id="popularity-icon">{icon}</div>;
    }
}
