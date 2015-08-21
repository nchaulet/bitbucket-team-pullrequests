import React from 'react';
import {initRepositories, fetchPullRequests, login} from '../actions/index';
import {connect} from 'react-redux'
import PullRequestDash from './PullRequestDash';
import TeamChoose from './TeamChoose';
import Loader from './Loader';
import Login from './Login';

@connect(
  (state) => {
    return {
      credentials: state.bitbucketCredentials,
      selectedTeam: state.selectedTeam
    };
  }
)
class App extends React.Component {

    render() {
        const {credentials, selectedTeam} = this.props;

        if (!credentials.get('logged')) {
            return (<Login error={credentials.get('error')} />);
        } else if (!selectedTeam) {
          return (<TeamChoose />);
        } else {
            return (<PullRequestDash/>);
        }
    }
}

export default App;
