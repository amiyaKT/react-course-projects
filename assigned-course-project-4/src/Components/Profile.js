import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    const user = this.props.userData;
    return (
      <>
        {user.notFound === null ? null : user.notFound ? (
          <div className='notfound'>
            <h2>Username is not found.</h2>
          </div>
        ) : (
          <section className='github-profile'>
            <div className='github-profile-info'>
              <a
                href={user.homeURL}
                target='_blank'
                title={user.username || user.name}
                rel='noopener noreferrer'
              >
                <img src={user.avatar} alt='user avatar' />
              </a>
              <h2>
                <a
                  href={user.homeURL}
                  target='_blank'
                  title={user.username || user.name}
                  rel='noopener noreferrer'
                >
                  {user.username || user.name}
                </a>
              </h2>
              <h3>{user.location}</h3>
              <small>{user.bio}</small>
            </div>
            <div className='github-profile-state'>
              <ul>
                <li>
                  <a
                    href={user.homeURL + '?tab=followers'}
                    target='_blank'
                    title='Number of followers'
                    rel='noopener noreferrer'
                    content='followers'
                  >
                    <i>{user.followers}</i>
                    Followers
                  </a>
                </li>
                <li>
                  <a
                    href={user.homeURL + '?tab=following'}
                    target='_blank'
                    title='Number of followings'
                    rel='noopener noreferrer'
                    content='following'
                  >
                    <i>{user.following}</i>
                    Following
                  </a>
                </li>
                <li>
                  <a
                    href={user.homeURL + '?tab=repositories'}
                    target='_blank'
                    title='Number of repos'
                    rel='noopener noreferrer'
                    content='repositories'
                  >
                    <i>{user.repos}</i>
                    Repos
                  </a>
                </li>
              </ul>
            </div>
          </section>
        )}
      </>
    );
  }
}
