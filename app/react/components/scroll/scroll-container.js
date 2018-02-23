import React from 'react';
import ScrollContent from './components/scroll-content';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import theme from './scroll-container-styles';
import {MuiThemeProvider} from 'material-ui/styles';

class ScrollContainer extends React.Component{

    render(){    
        const {dir, id, data, parentID, classes} = this.props;
        return (           
            <React.Fragment>
                <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
                    <ScrollContent data={data} id={id} parentID={parentID}/>
                </Typography>       
            </React.Fragment>
        )
    }
}

ScrollContainer.propTypes = {
    dir : PropTypes.string.isRequired, 
    parentID : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired, 
    data : PropTypes.object.isRequired,
}

export default ScrollContainer;