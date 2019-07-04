/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createUserToDB } from '../../Adapters/UsersAdapter';
import '../../stylesheets/forms/signup.scss';

class SignUpContainer extends React.Component {
  state = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    img_url: '',
    password: '',
    password_confirmation: '',
  };

  handleChange = e => {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  };

  validateEmail = () => {
    const { email } = this.state;
    const sanitizedEmail = email.toLowerCase();
    if (sanitizedEmail !== '') {
      const arr = sanitizedEmail.split('@');
      return arr[1] !== 'flatironschool.com' ? (
        <h4 className="validation-error">
          You must have a Flatiron email to register
        </h4>
      ) : null;
    }
  };

  validatePass = () => {
    const { password, password_confirmation } = this.state;
    if (password_confirmation !== '' && password_confirmation !== password) {
      return <h4 className="validation-error">Passwords Don't Match</h4>;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { password, password_confirmation } = this.state;
    if (password === password_confirmation) {
      const { dispatchSubmission, history } = this.props;
      dispatchSubmission(this.state);
      history.push('/');
    }
  };

  render() {
    const {
      username,
      password,
      email,
      first_name,
      last_name,
      img_url,
      password_confirmation,
    } = this.state;
    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          {this.validateEmail()}
          <label>Email</label>
          <input name="email" value={email} onChange={this.handleChange} />
          <label>First Name</label>
          <input
            name="first_name"
            value={first_name}
            onChange={this.handleChange}
          />
          <label>Last Name</label>
          <input
            name="last_name"
            value={last_name}
            onChange={this.handleChange}
          />
          <label>Profile Image URL</label>
          <input name="img_url" value={img_url} onChange={this.handleChange} />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          {this.validatePass()}
          <label>Confirm Password </label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSubmission: userObj => dispatch(createUserToDB(userObj)),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignUpContainer)
);
