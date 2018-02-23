import React from "react";
import PropTypes from "prop-types";
import PopularityIcon from './components/popularity-icon';

class PopularityContainer extends React.PureComponent {
  generateRating(popularity) {
    switch (true) {
      case (popularity > 90):
        return <PopularityIcon amount={5} />
      case (popularity > 80 && popularity <= 90):        
        return <PopularityIcon amount={4.5} />      
      case (popularity > 70 && popularity <= 80):        
        return <PopularityIcon amount={4}/>      
      case (popularity > 60 && popularity <= 70):
        return <PopularityIcon amount={3.5}/>;
      case (popularity > 50 && popularity <= 60):
        return <PopularityIcon amount={3} />;
      case (popularity > 40 && popularity <= 50):
        return <PopularityIcon amount={2.5}/>;
      case (popularity > 30 && popularity <= 40):
        return <PopularityIcon amount={2} />;
        case (popularity > 20 && popularity <= 30):
        return <PopularityIcon amount={1.5}/>;
        case (popularity > 10 && popularity <= 20):
        return <PopularityIcon amount={1} />;
        case (popularity >= 0 && popularity <= 10):
        return <PopularityIcon amount={0.5}/>;
    }
  }
  render() {
    return this.generateRating(this.props.popularity);
  }
}

PopularityContainer.propTypes = {
  popularity: PropTypes.number.isRequired
};

export default PopularityContainer;
