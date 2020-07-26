import React, { Component } from 'react';
import * as firebase from 'firebase';

var firebaseConfig = {
  // YOUR CONFIG FILE HERE
};
firebase.initializeApp(firebaseConfig);

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    auth: false,
  };

  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user }) => {
        this.setState({
          auth: true,
          message: 'Welcome ' + user.email,
        });
      })
      .catch((err) => {
        this.setState({
          message: err.message,
        });
      });
  };

  signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user }) => {
        firebase
          .database()
          .ref('users/' + user.uid)
          .set({
            email: user.email,
          });
        this.setState({
          message: 'Welcome ' + user.email,
        });
      })
      .catch((err) => {
        this.setState({
          message: err.message,
        });
      });
  };

  logout = () => {
    firebase.auth().signOut();
  };

  googleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(({ user }) => {
        firebase
          .database()
          .ref('users/' + user.uid)
          .set({
            email: user.email,
            name: user.displayName,
          });
        this.setState({
          message: 'Welcome ' + user.email,
        });
      })
      .catch((err) => {
        this.setState({
          message: err.message,
        });
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email'
          onChange={this.onChange}
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password'
          onChange={this.onChange}
        />
        <p>{this.state.message}</p>
        <button onClick={this.login} hidden={this.state.auth}>
          Login
        </button>
        <button onClick={this.signup}>Signup</button>
        <button hidden={!this.state.auth} onClick={this.logout}>
          Logout
        </button>
        <button
          hidden={this.state.auth}
          onClick={this.googleLogin}
          className='google'
        >
          Sign In With Google
        </button>
      </div>
    );
  }
}
