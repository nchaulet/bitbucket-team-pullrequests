import React from 'react';
import {loadTeams, selectTeam} from '../actions/index';
import {connect} from 'react-redux'
import Loader from './Loader';

@connect((state) => {
  return {
    teams: state.teams
  };
})
class TeamChoose extends React.Component {

  componentWillMount() {
    if (!this.props.teams) {
      this.props.dispatch(loadTeams());
    }
  }

  render() {

    const {teams} = this.props;

    if (!teams) {
      return (<Loader />);
    }


    return (
      <div className="container">
        <h1>Select team to display</h1>
        <hr/>
        {teams.map((team) => {
          return (
            <button className="btn btn-lg btn-default btn-block" onClick={this.selectTeam.bind(this, team)} key={team.username}>{team.display_name}</button>
          );
        })}
      </div>
    );
  }

  selectTeam(team) {
    this.props.dispatch(selectTeam(team.username));
  }
}

export default TeamChoose;
