import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
// Constants and Functions
import { BASE_URL } from '../../ApiConstants';
import { loginUserAction } from '../../Redux/actions/UserActions';
// Stylesheets
import '../../stylesheets/forms/login.scss';

class LoginContainer extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  async handleSubmit(e, state) {
    e.preventDefault();
    const { dispatchLoginUserAction, history } = this.props;
    let response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    });
    let json = await response.json();
    if (json.error) {
      this.setState({ error: json.error });
    } else {
      dispatchLoginUserAction(json.user);
      localStorage.setItem('token', json.jwt);
      history.push('/');
    }
  }

  loginError = () => {
    const { error } = this.state;
    if (error) {
      return <h2 className="login-error">{error}</h2>;
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        {this.loginError()}
        <form
          className="login-form"
          onSubmit={event => this.handleSubmit(event, this.state)}
        >
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
        <h3>
          {' '}
          New here? <Link to="/signup">Sign up!</Link>
        </h3>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchLoginUserAction: user => dispatch(loginUserAction(user)),
});

const mapStateToProps = state => state;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginContainer)
);
