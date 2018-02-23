import React from "react";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import {Typography} from 'material-ui';
import ScrollContainer from "../../scroll/scroll-container";
import {withTheme} from 'material-ui/styles';

class UIContent extends React.PureComponent {

  handleSwipe = (index) => {
    this.props.onChangeSwipe(index);
  }

  generateUIContent(obj, dir, parentID){
    return Object.keys(obj).map(k => { 
      return (
        <ScrollContainer key={k} dir={dir} data={obj[k]} id={k} parentID={parentID}></ScrollContainer>
      );
    })
  }

  render() {
    const {theme, value, data, id} = this.props;
    return (
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleSwipe}
        >
          {this.generateUIContent(data, theme.direction, id)}
        </SwipeableViews>
    );
  }
}

UIContent.propTypes = {
  value: PropTypes.number.isRequired,
  id : PropTypes.string.isRequired,
  data : PropTypes.object.isRequired,
  onChangeSwipe : PropTypes.func.isRequired
};

export default withTheme()(UIContent);