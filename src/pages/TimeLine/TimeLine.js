import React, { Component } from 'react';
import api from '../../services/api';
import socket from 'socket.io-client';

import Tweet from '../../components/Tweet/Tweet';
import twitterLogo from '../../twitter.svg';
import './Timeline.css';

class TimeLine extends Component {
  state = {
    tweets: [],
    newTweet: ''
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const tweets = await api.get('/tweets');

    this.setState({ tweets: tweets.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:8080');

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  newTweetHandler = async event => {
    if (event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    await api.post('/tweets', { content, author });

    this.setState({ newTweet: '' });
  };

  inputChangedHandler = event => {
    this.setState({ newTweet: event.target.value });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter" />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.inputChangedHandler}
            onKeyDown={this.newTweetHandler}
            placeholder="Is there anything you want to say?"
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} onLike={this.likeHandler} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TimeLine;
