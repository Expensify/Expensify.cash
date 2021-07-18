import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {propTypes, defaultProps} from '../anchorForCommentsOnlyPropTypes';
import fileDownload from '../../../libs/fileDownload';
import PressableWithContextMenu from '../../PressableWithContextMenu';
import anchorContextMenuOptions from '../anchorContextMenuOptions';
import withLocalize from '../../withLocalize';
import compose from '../../../libs/compose';
import Text from '../../Text';

/*
 * This is a default anchor component for regular links.
 */
const BaseAnchorForCommentsOnly = ({
    href,
    children,
    style,
    shouldDownloadFile,
    translate,
    ...props
}) => (
    <PressableWithContextMenu
        onPress={() => (shouldDownloadFile ? fileDownload(href) : Linking.openURL(href))}
        contextMenuItems={anchorContextMenuOptions(href, translate)}
    >
        <Text
            style={StyleSheet.flatten(style)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {children}
        </Text>
    </PressableWithContextMenu>
);

BaseAnchorForCommentsOnly.propTypes = propTypes;
BaseAnchorForCommentsOnly.defaultProps = defaultProps;
BaseAnchorForCommentsOnly.displayName = 'BaseAnchorForCommentsOnly';

export default compose(withLocalize)(BaseAnchorForCommentsOnly);
