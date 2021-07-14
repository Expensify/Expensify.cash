import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import styles from '../styles/styles';
import themeColors from '../styles/themes/default';

const propTypes = {
    /** Controls whether the loader is mounted and displayed */
    visible: PropTypes.bool,

    /** Controls whether the loader is loaded fast or not
     * This is experimental yet.
    */
    fastLoad: PropTypes.bool,
};

const defaultProps = {
    visible: true,
    fastLoad: false,
};

/**
 * Loading indication component intended to cover the whole page, while the page prepares for initial render
 *
 * @returns {JSX.Element}
 */
const FullScreenLoadingIndicator = ({visible, fastLoad}) => visible && (
    <View
        style={
            fastLoad
                ? styles.fullScreenLoadingFast
                : [StyleSheet.absoluteFillObject, styles.fullScreenLoading]
        }
    >
        <ActivityIndicator color={themeColors.spinner} size="large" />
    </View>
);

FullScreenLoadingIndicator.propTypes = propTypes;
FullScreenLoadingIndicator.defaultProps = defaultProps;

export default FullScreenLoadingIndicator;
