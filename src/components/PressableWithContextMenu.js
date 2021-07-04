import React, {Component} from 'react';
// import {withOnyx} from 'react-native-onyx';
import PressableWithSecondaryInteraction from './PressableWithSecondaryInteraction';
import ReportActionContextMenu from '../pages/home/report/ReportActionContextMenu';
import PopoverWithMeasuredContent from './PopoverWithMeasuredContent';
// import PopoverWithMeasuredContent from './PopoverWithMeasuredContent';

// const propTypes = {

// }

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
