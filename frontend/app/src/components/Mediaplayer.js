import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class MediaPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playing: true,
      loop: false,
      duration: 0,
    };
  }

  render() {
    const {
      url,
    } = this.props;
    const { playing, loop, duration } = this.state;
    return (
      <div>
        <button onClick={this.playPause} type="button">Play</button>
        <button onClick={this.nextSong} type="button">Play</button>
        <button onClick={this.playPause} type="button">Play</button>
        <ReactPlayer
          url={url}
          playing={playing}
          loop={loop}
          duration={duration}
          height="100%"
          width="100%"
        />
      </div>
    );
  }
}
