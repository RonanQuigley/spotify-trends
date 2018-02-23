import React from "react";
import PropTypes from "prop-types";
import UIBanner from "./components/ui-banner";
import UIContent from "./components/ui-content";
import styles from "./ui-container-styles";
import { withStyles } from "material-ui/styles";
import { Paper } from "material-ui";

class UIContainer extends React.PureComponent {
  render() {
    const { id, data, value, onChange, onChangeSwipe, classes } = this.props;

    return (
      <React.Fragment>
        <Paper classes={{ root: classes.root }}>
          <UIBanner data={data} value={value} onChange={onChange} />
          <UIContent
            id={id}
            data={data}
            value={value}
            onChangeSwipe={onChangeSwipe}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UIContainer);

UIContainer.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSwipe: PropTypes.func.isRequired
};
