import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { labels } from 'common/react/common/utilities';
import { AppBar, Tabs, Tab, withStyles } from '@material-ui/core';
import styles from './styles';

@withStyles(styles)
export default class Interface extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        classes: PropTypes.object,
        value: PropTypes.number.isRequired
    };

    generateLabels = () => {
        const classes = this.props.classes;
        return labels.map(label => {
            return <Tab className={classes.root} key={label} label={label} />;
        });
    };

    render() {
        const { value, onChange, classes } = this.props;
        return (
            <AppBar className={classes.appBar} position="static">
                <Tabs value={value} onChange={onChange} centered={true}>
                    {this.generateLabels()}
                </Tabs>
            </AppBar>
        );
    }
}