import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Card, CardContent, withStyles } from '@material-ui/core';
import styles from './styles';
import Image from '../image';
import Popularity from '../popularity';
import { Typography } from '@material-ui/core';
import Rank from 'charts/components/chart/components/rank';
import Genre from 'charts/components/chart/components/genre';

@withStyles(styles)
export default class Element extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        rank: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { item, rank, classes } = this.props;
        const {
            card,
            ranking,
            cardText,
            cardTextLeft,
            cardTextRight
        } = classes;
        const { name, uri, image, popularity, genres } = item;
        return (
            <Card className={card}>
                <Image uri={uri} image={image} />
                <CardContent>
                    <div className={cardText}>
                        <div className={cardTextLeft}>
                            <Typography variant="subheading">{name}</Typography>
                            <Popularity rating={popularity} />
                            {genres && <Genre genre={genres} />}
                        </div>
                        <div className={cardTextRight}>
                            <Rank rank={rank} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
