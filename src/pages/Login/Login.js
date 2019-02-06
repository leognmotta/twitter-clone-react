import React, { Component } from 'react';

import twitterLogo from '../../twitter.svg';
import './Login.css';

class Login extends Component {
  state = {
    username: ''
  };

  submitHandler = event => {
    event.preventDefault();

    const { username } = this.state;

    if (!username.length) return;

    localStorage.setItem('@GoTwitter:username', username);

    this.props.history.push('/timeline');
  };

  inputChangedHandler = event => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.submitHandler}>
          <input
            value={this.state.username}
            onChange={this.inputChangedHandler}
            placeholder="User name"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
