import React from "react";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import Utilities from "../../../utilities";
import { withStyles } from "material-ui/styles";
import Styles from "./scroll-element-styles";
import Popularity from "../../popularity/popularity-container";

class ScrollElement extends React.PureComponent {
  render() {
    const { id, parentID, index, data, classes } = this.props;
    return (
      <Card
        id={Utilities.camelCaseToDashed(parentID) + "-" + index}
        className={classes.card}
      >
        <CardContent>
          <a className="" href={data.uri}>
            <img className={classes.media} src={data.image} />
          </a>
          <div className={classes.cardText}>
            <div className={classes.cardTextLeft}>
              <Typography variant="subheading">{data.name}</Typography>
              <Popularity popularity={data.popularity} data={data} />
              <Typography variant="caption">
                {data.genres ? Utilities.capitaliseWords(data.genres) : null}
              </Typography>
            </div>
            <div className={classes.cardTextRight}>
              <Typography className={classes.index} variant="display1">
                {index}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

ScrollElement.propTypes = {
  index: PropTypes.number.isRequired,
  parentID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(ScrollElement);
