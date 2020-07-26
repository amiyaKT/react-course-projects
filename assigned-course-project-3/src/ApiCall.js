import React, { Component } from 'react';
import axios from 'axios';

export default class ApiCall extends Component {
  state = {
    posts: [],
    subr: 'space',
  };

  componentDidMount = async () => {
    const request = await axios.get(
      `https://www.reddit.com/r/${this.state.subr}.json`
    );
    request.data.data.children.map((data) => {
      this.setState({
        posts: [...this.state.posts, data.data],
      });
    });
    console.log(this.state.posts);
  };

  render() {
    return (
      <div>
        <h1>${`/r/${this.state.subr}`}</h1>
        <ul>
          {this.state.posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
