import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, withStyles } from '@material-ui/core';
import styles from './styles';
import Image from '../image';
import Popularity from '../popularity';
import { Typography } from '@material-ui/core';
import Rank from 'charts/components/chart/components/rank';
import Genre from 'charts/components/chart/components/genre';
import { hot } from 'react-hot-loader';

@hot(module)
@withStyles(styles)
export default class Element extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        rank: PropTypes.number.isRequired,
        classes: PropTypes.object
    };

    render() {
        const { item, rank, classes } = this.props;
        const { name, uri, image, popularity, genres } = item;
        return (
            <Card className={classes.card}>
                <div className={classes.image}>
                    <Image uri={uri} image={image} />
                </div>
                <CardContent className={classes.cardContent}>
                    <div className={classes.cardText}>
                        <div className={classes.cardTextLeft}>
                            <Typography
                                className={classes.test}
                                variant="subheading"
                            >
                                {name}
                            </Typography>
                            <Popularity rating={popularity} />
                            {genres && <Genre genre={genres} />}
                        </div>
                        <div className={classes.cardTextRight}>
                            <Rank rank={rank} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }
}
