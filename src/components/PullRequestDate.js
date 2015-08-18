import React, {PropTypes} from 'react';
import moment from 'moment';

class PullRequestDate extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired
  }

  render() {
    const {date} = this.props;

    return (
      <span>{moment(date).fromNow()}</span>
    );
  }
}

export default PullRequestDate;
