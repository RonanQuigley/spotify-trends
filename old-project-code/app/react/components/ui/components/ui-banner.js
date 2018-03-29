import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Utilities from "../../../utilities";
import styles from "./ui-banner-styles";
import { withStyles, MuiThemeProvider } from "material-ui/styles";

class UIBanner extends React.PureComponent {
  generateLabels(obj) {
    return Object.keys(obj).map(k => (
      <Tab key={k} label={Utilities.camelCaseToSpaced(k)} />
    ));
  }

  handleChange = (event, index) => {
    this.props.onChange(index);
  };

  render() {
    // retrieved from the higher order function withStyles
    const { data, value, classes} = this.props;
    return (
        <AppBar position="static" classes={classes}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            fullWidth
            centered
          >
            {this.generateLabels(data)}
          </Tabs>
        </AppBar>
    );
  }
}

UIBanner.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  classes : PropTypes.object.isRequired,
};

// with styles is a higher order function that enhances this component with styling
export default withStyles(styles)(UIBanner);
