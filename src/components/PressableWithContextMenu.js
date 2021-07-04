import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {withOnyx} from 'react-native-onyx';
import PressableWithSecondaryInteraction from './PressableWithSecondaryInteraction';
import ReportActionContextMenu from '../pages/home/report/ReportActionContextMenu';
import PopoverWithMeasuredContent from './PopoverWithMeasuredContent';
import Icon from './Icon';

// A clickable thing you can wrap around an element. You also pass in a list of context actions
// to present to a user.

const propTypes = {
  contextMenu: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    onPress: PropTypes.func
  }))
}

class PressableWithContextMenu extends Component {
    render() {
        return(
            <div>
                <PressableWithSecondaryInteraction onSecondaryInteraction={() => console.log('pressed')}>
                  {this.props.children}
                </PressableWithSecondaryInteraction>
                <PopoverWithMeasuredContent>

                </PopoverWithMeasuredContent>
            </div>
        )
    }
}

export default PressableWithContextMenu;
