import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export const DPlayer = ({ mediaID, config }) => {
  const deezFront = 'https://www.deezer.com/plugins/player?';
  let attribute = '';
  Object.keys(config).forEach((key) => {
    attribute += config[key];
  });

  return (
    <iframe
      title="dz-root"
      scrolling="no"
      frameBorder="0"
      src={
        `${deezFront}${attribute}&id=${mediaID}`
      }
      width="300px"
      height="300px"
      style={{
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};

export class RPlayer extends Component {
  constructor() {
    super();
    this.state = {
      played: 0,
    };
  }

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  }

  onSeekMouseUp = (e) => {
    this.player.seekTo(parseFloat(e.target.value));
  }

  onProgress = (e) => {
    this.setState({ played: e.played });
  }

  ref = (player) => {
    this.player = player;
  }

  render() {
    const { mediaID } = this.props;
    const { played } = this.state;
    console.log('played', played);
    return (
      <div>
        <input // Seeker
          style={{
            '--percent': `${played * 100}%`,
            marginTop: '0.3em',
            marginBottom: '1em',
          }}
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onMouseDown={this.onSeekMouseDown}
          onChange={this.onSeekChange}
          onMouseUp={this.onSeekMouseUp}
        />
        <ReactPlayer
          ref={this.ref}
          url={`https://www.youtube.com/watch?v=${mediaID}`}
          playing
          width="auto"
          height="19em"
          onProgress={this.onProgress}
        />
      </div>
    );
  }
}
