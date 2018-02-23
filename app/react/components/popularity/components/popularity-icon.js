import { Star, StarHalf } from "material-ui-icons";
import React from "react";
import PropTypes from "prop-types";
import styles from './popularity-icon-styles';
import {withStyles} from 'material-ui';
class PopularityIcon extends React.PureComponent {

  getIcons(amount, classes) {
    let arr = [];
    let starHalf = false;
    let length = amount - 1;
    if (amount % 1 !== 0) {
      starHalf = true;
      length = Math.floor(amount);
    }    
    for (let i = 0; i < length; i++) {
        arr.push(<Star className={classes.icon} key={i} />);
    }
    // for the last element, or if there is only half a star required, we check after the loop
    starHalf === true ? arr.push(<StarHalf className={classes.icon} key={length} />) : arr.push(<Star className={classes.icon} key={length}/>);
    return arr;
  }

  render() {
    const {amount, classes} = this.props;
    return this.getIcons(amount, classes);
  }
}

PopularityIcon.propTypes = {
  amount: PropTypes.number.isRequired,
  classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(PopularityIcon);
