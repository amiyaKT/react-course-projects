import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';

class App extends Component {
  state = {
    idToken: '',
    profile: null,
  };

  componentDidMount = () => {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain, {
      auth: {
        responseType: 'token id_token',
      },
    });
    this.lock.on('authenticated', (authResult) => {
      this.setProfile(authResult.idToken, authResult.idTokenPayload);
    });
    this.getProfile();
  };

  showLock = () => {
    this.lock.show();
  };

  logout = () => {
    this.setState(
      {
        idToken: '',
        profile: null,
      },
      () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('profile');
      }
    );
  };

  setProfile = (idToken, profile) => {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile')),
    });
  };

  getProfile = () => {
    if (localStorage.getItem('idToken')) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <Header
          onLogin={this.showLock}
          onLogout={this.logout}
          idToken={this.state.idToken}
          profile={this.state.profile}
        ></Header>
        {this.state.idToken ? <Github /> : 'Sign in to view app'}
      </div>
    );
  }
}

App.defaultProps = {
  clientID: '',
  domain: '',
};

export default App;
