import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Card, CardContent, withStyles } from '@material-ui/core';
import styles from './styles';
import Image from '../image';

@hot(module)
@withStyles(styles)
export default class App extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        classes: PropTypes.object
    };
    render() {
        const { item, classes } = this.props;
        const { media, card } = classes;
        const { name, popularity, uri, image } = item;
        return (
            <Card className={card}>
                <Image uri={uri} image={image} />
                <CardContent component="p">
                    {name}
                    {popularity}
                    {uri}
                </CardContent>
            </Card>
        );
    }
}
