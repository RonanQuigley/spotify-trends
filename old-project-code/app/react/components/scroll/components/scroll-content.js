import React from 'react';
import ScrollElement from './scroll-element';
import Utilities from '../../../utilities';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'; 
import Styles from './scroll-content-styles';

class ScrollContent extends React.PureComponent{
    generateElements(obj, id, parentID){
        let offset = 1; 
        return Object.keys(obj).map((k, index) => {
            return <ScrollElement id={id} parentID={parentID} key={k} index={index + offset} data={obj[k]}/>
        })
    }
    render(){
        const {data, id, parentID, classes} = this.props;
        return(
            <div className={classes.resultsContainerOuter}>
                <div className={classes.resultsContainerInner}>
                    {this.generateElements(data, id, parentID)}      
                </div>                
            </div>
        )
    }
}

ScrollContent.propTypes = {
    classes : PropTypes.object.isRequired,
    parentID : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired, 
    data : PropTypes.object.isRequired,
}

export default withStyles(Styles)(ScrollContent);