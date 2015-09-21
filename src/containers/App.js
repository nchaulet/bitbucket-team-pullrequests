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
      credentials: state.credentials,
      selectedTeam: state.selectedTeam
    };
  }
)
class App extends React.Component {

    render() {
        const {credentials, selectedTeam} = this.props;

        if (!credentials) {
            return (<Login />);
        } else if (!selectedTeam) {
          return (<TeamChoose />);
        } else {
            return (<PullRequestDash/>);
        }
    }
}

export default App;
