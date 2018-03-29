import React from "react";
import styles from "./header-container-styles";
import { withStyles } from "material-ui";
import { Typography } from "material-ui";
import PropTypes from "prop-types";
import Utilities from "../../utilities";
import { AppBar} from "material-ui";

class HeaderContainer extends React.PureComponent {
 
  render() {
    const { classes, text, theme } = this.props;
    return (
      <AppBar position="static" classes={{root : classes.appBar}}>
        <Typography color="inherit" variant="title" classes={{root : classes.typography}}>
          {Utilities.camelCaseToSpaced(text)}
        </Typography>
      </AppBar>
    );
  }
}

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HeaderContainer);
