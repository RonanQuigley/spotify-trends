import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Icon from 'common/react/components/chart/components/icon';

@hot(module)
export default class Popularity extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    setPopularity(rating) {
        switch (true) {
            case rating > 90:
                return 5;
            case rating > 80 && rating <= 90:
                return 4.5;
            case rating > 70 && rating <= 80:
                return 4;
            case rating > 60 && rating <= 70:
                return 3.5;
            case rating > 50 && rating <= 60:
                return 3;
            case rating > 40 && rating <= 50:
                return 2.5;
            case rating > 30 && rating <= 40:
                return 2;
            case rating > 20 && rating <= 30:
                return 1.5;
            case rating > 10 && rating <= 20:
                return 1;
            case rating >= 0 && rating <= 10:
                return 0.5;
        }
    }

    render() {
        const { rating } = this.props;
        const popularity = this.setPopularity(rating);
        return <Icon popularity={popularity} />;
    }
}
