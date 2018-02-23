import React from "react";
import UIContainer from "./components/ui/ui-container";
import theme from "./theme";
import { MuiThemeProvider, withStyles} from "material-ui/styles";
import Reboot from "material-ui/Reboot";
import HeaderContainer from './components/header/header-container';
import PropTypes from 'prop-types';
import styles from './styles';

class App extends React.Component {
  state = {
    value: 0
  };

  onChange = index => {
    this.setState({ value: index });
  };

  onChangeSwipe = index => {
    this.setState({ value: index });
  };

  render() {
    const {data, id, classes} = this.props;
    
    return (
      <Reboot>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <HeaderContainer text={id}/>
            <UIContainer
              id={id}
              data={data}
              value={this.state.value}
              onChange={this.onChange}
              onChangeSwipe={this.onChangeSwipe}
            />
          </div>
        </MuiThemeProvider>
      </Reboot>
    );
  }
}

App.propTypes = {
  data : PropTypes.object.isRequired, 
  id : PropTypes.string.isRequired, 
  classes : PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
