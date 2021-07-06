import React, {Component} from 'react';
import {View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import PressableWithSecondaryInteraction from './PressableWithSecondaryInteraction';
import ReportActionContextMenu from '../pages/home/report/ReportActionContextMenu';
import PopoverWithMeasuredContent from './PopoverWithMeasuredContent';
import ReportActionContextMenuItem from '../pages/home/report/ReportActionContextMenuItem';

// Adds secondary actions via right-clicking or long-pressing to any elements.
// You also pass in a list of possible secondary interactions

class HTMLContextMenu extends Component {
    render() {
        return (<View>{this.props.children}</View>)
    }
}

const propTypes = {
  contextMenuItems: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    onPress: PropTypes.func
  }))
}

class PressableWithContextMenu extends Component {
    constructor(props) {
        super(props);

        this.onPopoverHide = () => {};
        this.state = {
            isPopoverVisible: false,
            cursorPosition: {
                horizontal: 0,
                vertical: 0,
            },

            // The horizontal and vertical position (relative to the screen) where the popover will display.
            popoverAnchorPosition: {
                horizontal: 0,
                vertical: 0,
            },
        };

        this.popoverAnchor = undefined;
        this.showPopover = this.showPopover.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
        this.renderContexMenu = this.renderContexMenu.bind(this);
    }

    /**
     * Get the Context menu anchor position
     * We calculate the achor coordinates from measureInWindow async method
     *
     * @returns {Promise<Object>}
     * @memberof ReportActionItem
     */
    getMeasureLocation() {
        return new Promise((res) => {
            if (this.popoverAnchor) {
                this.popoverAnchor.measureInWindow((x, y) => res({x, y}));
            } else {
                res({x: 0, y: 0});
            }
        });
    }

    /**
   * Save the location of a native press event & set the Initial Context menu anchor coordinates
   *
   * @param {Object} nativeEvent
   * @returns {Promise}
   */
    capturePressLocation(nativeEvent) {
      return this.getMeasureLocation().then(({x, y}) => {
          this.setState({
              cursorPosition: {
                  horizontal: nativeEvent.pageX - x,
                  vertical: nativeEvent.pageY - y,
              },
              popoverAnchorPosition: {
                  horizontal: nativeEvent.pageX,
                  vertical: nativeEvent.pageY,
              },
          });
      });
    }

    /**
   * Show the ContextMenu modal popover.
   *
   * @param {Object} [event] - A press event.
   * @param {string} [selection] - A copy text.
   */
    showPopover(event) {
      const { nativeEvent = {} } = event;
      this.capturePressLocation(nativeEvent).then(() => {
          this.setState({isPopoverVisible: true});
      });
    }

    /**
    * Hide the ReportActionContextMenu modal popover.
    * @param {Function} onHideCallback Callback to be called after popover is completely hidden
    */
    hidePopover() {
        this.setState({isPopoverVisible: false});
    }

    renderContexMenu() {
      return (
          <HTMLContextMenu>
              {this.props.contextMenuItems.map((option, index) => {
                  return (
                    <ReportActionContextMenuItem
                        key={index}
                        icon={option.icon}
                        text={option.text}
                        onPress={option.onPress}
                    />
                  );
              })}
          </HTMLContextMenu>
      )
    }

    render() {
        return(
            <View>
              <PressableWithSecondaryInteraction
                ref={el => this.popoverAnchor = el}
                onSecondaryInteraction={this.showPopover}
              >
                  {this.props.children}
              </PressableWithSecondaryInteraction>
                {this.state.isPopoverVisible &&
                (<PopoverWithMeasuredContent
                  isVisible={this.state.isPopoverVisible}
                  onClose={this.hidePopover}
                  // onModalHide={this.onPopoverHide}
                  anchorPosition={this.state.popoverAnchorPosition}
                  animationIn="fadeIn"
                  animationOutTiming={1}
                  measureContent={this.renderContexMenu}
                  shouldSetModalVisibility={false}
                  fullscreen={false}
                >
                  {this.renderContexMenu()}
                </PopoverWithMeasuredContent>)}
            </View>
        )
    }
}

export default PressableWithContextMenu;
