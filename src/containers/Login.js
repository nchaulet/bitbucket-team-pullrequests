import React from 'react';
import {login} from '../actions/index';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import config from '../config';

@connect(
  () => {
    return {}
  }
)
class Login extends React.Component {
  render() {
    const formStyle = {
        maxWidth: 330
    };

    const {error} = this.props;

    return (
      <div className="container" style={formStyle}>
        <h2>Login</h2>
        <hr/>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}
        <a href={'https://bitbucket.org/site/oauth2/authorize?client_id=' + config.BITBUCKET_CLIENT_ID + '&response_type=token'} className="btn btn-primary btn-lg">Connect with bitbucket</a>
      </div>
    );
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(
      ReactDOM.findDOMNode(this.refs.pseudo).value,
      ReactDOM.findDOMNode(this.refs.password).value
    ));
  }
}

export default Login;
