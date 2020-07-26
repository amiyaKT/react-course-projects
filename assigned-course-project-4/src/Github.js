import React, { Component } from 'react';
import axios from 'axios';
import Search from './Components/Search';
import Profile from './Components/Profile';

export default class Github extends Component {
  state = {
    username: '',
    name: '',
    avatar: '',
    repos: '',
    followers: '',
    following: '',
    homeURL: '',
    notFound: null,
    location: '',
    bio: '',
  };

  getProfile = async (username) => {
    let url = `https://api.github.com/users/${username}`;
    try {
      const data = await (await axios.get(url)).data;
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: false,
        location: data.location,
        bio: data.bio,
      });
    } catch (error) {
      this.setState({
        username: '',
        name: '',
        avatar: '',
        repos: '',
        followers: '',
        following: '',
        homeURL: '',
        notFound: true,
        location: '',
        bio: '',
      });
    }
  };

  render() {
    return (
      <div>
        <Search getProfile={this.getProfile}></Search>
        <Profile userData={this.state}></Profile>
      </div>
    );
  }
}
