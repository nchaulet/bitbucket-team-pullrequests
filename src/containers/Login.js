import React from 'react';
import {login} from '../actions/index';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'

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

    return (
      <div className="container" style={formStyle}>
        <h2>Login</h2>
        <hr/>
        <form onSubmit={this.handleLogin.bind(this)}>
          <input ref="pseudo"  type="text" placeholder="bitbucket pseudo" className="form-control" required autofocus />
          <input ref="password" type="password" placeholder="bitbucket password" className="form-control" required />
          <br/>
          <input className="btn btn-block btn-primary" type="submit" value="Ok" />
        </form>
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
