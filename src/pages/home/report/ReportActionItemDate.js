import React, {memo} from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/styles';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import Text from '../../../components/Text';

const propTypes = {
    /** UTC timestamp for when the action was created */
    timestamp: PropTypes.number.isRequired,
    ...withLocalizePropTypes,
};

const ReportActionItemDate = props => (
    <Text style={[styles.chatItemMessageHeaderTimestamp]}>
        {props.timestampToDateTime(props.timestamp)}
    </Text>
);

ReportActionItemDate.propTypes = propTypes;
ReportActionItemDate.displayName = 'ReportActionItemDate';

export default withLocalize(memo(ReportActionItemDate));
