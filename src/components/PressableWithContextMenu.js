import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';
import {isFunction, isEqual} from 'underscore';
import PressableWithSecondaryInteraction from './PressableWithSecondaryInteraction';
import PopoverWithMeasuredContent from './PopoverWithMeasuredContent';
import ReportActionContextMenuItem from '../pages/home/report/ReportActionContextMenuItem';

/**
 * Adds secondary actions via right-clicking or long-pressing to any element.
 * Pass in an array of context menu actions (see shape of propTypes)
 */

const propTypes = {
    /** Array of context menu actions */
    contextMenuItems: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.elementType.isRequired,
        onPress: PropTypes.func.isRequired,
        successIcon: PropTypes.elementType,
        successText: PropTypes.string,
    })),

    /** Element(s) to wrap in a pressbale/secondary action */
    children: PropTypes.elementType.isRequired,
};

const defaultProps = {
    contextMenuItems: [],
};

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
        this.renderContextMenu = this.renderContextMenu.bind(this);
        this.measurePopoverAnchorPosition = this.measurePopoverAnchorPosition.bind(this);
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.measurePopoverAnchorPosition);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isPopoverVisible !== nextState.isPopoverVisible
            || !isEqual(this.state.popoverAnchorPosition, nextState.popoverAnchorPosition);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.measurePopoverAnchorPosition);
    }

    /**
     * Get the context menu anchor position
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
     * This gets called on Dimensions change to find the anchor coordinates for the action context menu.
     */
    measurePopoverAnchorPosition() {
        if (!this.state.isPopoverVisible) {
            return;
        }
        this.getMeasureLocation().then(({x, y}) => {
            this.setState(prev => ({
                popoverAnchorPosition: {
                    horizontal: prev.cursorPosition.horizontal + x,
                    vertical: prev.cursorPosition.vertical + y,
                },
            }));
        });
    }

    /**
   * Save the location of a native press event & set the initial context menu anchor coordinates
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
   * Show the context menu modal popover.
   *
   * @param {Object} [event] - A press event.
   * @param {string} [selection] - A copy text.
   */
    showPopover(event) {
        const {nativeEvent = {}} = event;
        this.capturePressLocation(nativeEvent).then(() => {
            this.setState({isPopoverVisible: true});
        });
    }

    /**
    * Hide the context menu modal popover.
    * @param {Boolean} shouldDelay if true, will delay hiding the popover for aesthetics
    * @param {Function} onHideCallback Callback to be called after popover is completely hidden
    */
    hidePopover(shouldDelay, onHideCallback) {
        if (isFunction(onHideCallback)) {
            this.onPopoverHide = onHideCallback;
        }
        setTimeout(() => this.setState({isPopoverVisible: false}), shouldDelay ? 800 : 0);
    }

    renderContextMenu() {
        return (
            <View>
                {this.props.contextMenuItems.map(function (option) {
                    return (
                        <ReportActionContextMenuItem
                            key={option.text}
                            icon={option.icon}
                            text={option.text}
                            successText={option.successText}
                            successIcon={option.successIcon}
                            onPress={() => this.hidePopover(true, option.onPress)}
                        />
                    );
                })}
            </View>
        );
    }

    render() {
        return (
            <View>
                <PressableWithSecondaryInteraction
                    ref={el => this.popoverAnchor = el}
                    onSecondaryInteraction={this.showPopover}
                >
                    {this.props.children}
                </PressableWithSecondaryInteraction>
                <PopoverWithMeasuredContent
                    isVisible={this.state.isPopoverVisible}
                    onClose={this.hidePopover}
                    onModalHide={this.onPopoverHide}
                    anchorPosition={this.state.popoverAnchorPosition}
                    animationIn="fadeIn"
                    animationOutTiming={1}
                    measureContent={this.renderContextMenu}
                    shouldSetModalVisibility={false}
                    fullscreen={false}
                >
                    {this.renderContextMenu()}
                </PopoverWithMeasuredContent>
            </View>
        );
    }
}

PressableWithContextMenu.propTypes = propTypes;
PressableWithContextMenu.defaultProps = defaultProps;

export default PressableWithContextMenu;
