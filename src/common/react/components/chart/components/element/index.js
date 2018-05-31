import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Card, CardContent, withStyles } from '@material-ui/core';
import styles from './styles';
import Image from '../image';
import Popularity from '../popularity';

@hot(module)
@withStyles(styles)
export default class Element extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        classes: PropTypes.object
    };
    render() {
        const { item, classes } = this.props;
        const { card } = classes;
        const { name, uri, image, popularity } = item;
        return (
            <Card className={card}>
                <Image uri={uri} image={image} />
                <CardContent>
                    {name}
                    <Popularity rating={popularity} />
                    {uri}
                </CardContent>
            </Card>
        );
    }
}
