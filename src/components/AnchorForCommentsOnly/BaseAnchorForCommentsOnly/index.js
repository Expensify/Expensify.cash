import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {propTypes, defaultProps} from '../anchorForCommentsOnlyPropTypes';
import PressableWithContextMenu from '../../PressableWithContextMenu';
import anchorContextMenuOptions from '../anchorContextMenuOptions';
import withLocalize from '../../withLocalize';
import compose from '../../../libs/compose';

/*
 * This is a default anchor component for regular links.
 */
const BaseAnchorForCommentsOnly = ({
    href,
    rel,
    target,
    children,
    style,
    translate,
    ...props
}) => (
    <PressableWithContextMenu contextMenuItems={anchorContextMenuOptions(href, translate)}>
        <Text
            style={StyleSheet.flatten(style)}
            accessibilityRole="link"
            href={href}
            hrefAttrs={{rel, target}}
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
