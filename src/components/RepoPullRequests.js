import React, {PropTypes} from 'react';
import PullRequest from './PullRequest';

class RepoPullRequests extends React.Component {

  static propTypes = {
    repo: PropTypes.string.isRequired,
    pullrequests: PropTypes.array.isRequired,
  }

  render() {
    const {pullrequests,repo} = this.props;

    const headingStyle = {
      padding: '20px'
    };
    return (
      <div className="col-md-6">
          {pullrequests.map((pr) => {
            return (
              <div key={pr.id}>
                <PullRequest pr={pr} />
              </div>
            );
          })}
      </div>
    );
  }
}

export default RepoPullRequests;
