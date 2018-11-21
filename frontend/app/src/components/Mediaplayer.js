import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../index.css';
import convertString from '../utils/converter';
import HNDLogo from '../assets/hnd.svg';

import {
  DivMediaPlayer,
  DivMediaMiddle,
  DivMediaImg,
  RepeatIcon,
  PlayIcon,
  PauseIcon,
  NextIcon,
  PrevIcon,
  DivDur,
  DivTitle,
} from '../styling/MyLibrary.style';
import { Img } from '../styling/DivTap.style';

export default class MediaPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      loop: false,
      played: 0,
      seeking: false,
      playedSec: 0,
    };
  }

  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  }

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  }

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  }

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState({
        played: state.played,
        playedSec: state.playedSeconds,
      });
    }
  }

  onEnded = () => {
    const { loop } = this.state;
    this.setState({ playing: loop });
    this.nextSong();
  }

  onPause = () => {
    this.setState({ playing: false });
  }

  onReady = () => {
    this.setState({ playing: true });
  }

  toggleLoop = () => {
    const { loop } = this.state;
    this.setState({ loop: !loop });
  }

  playPause = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  nextSong = () => {
    const {
      wholeDB,
      PassedObj: {
        passedID,
      },
      playThis,
    } = this.props;
    console.log('Next Song', passedID);
    if (passedID !== undefined) {
      if (passedID < wholeDB.length - 1) {
        playThis(wholeDB[passedID + 1], passedID + 1);// on normal condition
      } else {
        playThis(wholeDB[0], 0); // if on last song, return back to 0
      }
    }
  }

  prevSong = () => {
    console.log('Prev Song');
    const {
      wholeDB,
      PassedObj: {
        passedID,
      },
      playThis,
    } = this.props;
    if (passedID !== undefined) {
      if (passedID === 0) {
        // if at first song, jump to last song
        playThis(wholeDB[wholeDB.length - 1], wholeDB.length - 1);
      } else {
        playThis(wholeDB[passedID - 1], passedID - 1);
      }
    }
  }

  ref = (player) => {
    this.player = player;
  }

  render() {
    const {
      url,
      PassedObj: {
        passedID,
        passedSongTitle,
        passedImg,
        passsedDur,
      },
      wholeDB,
    } = this.props;
    console.log('bit', passedSongTitle, passedID, wholeDB);
    const {
      playing, loop, played, playedSec,
    } = this.state;
    return (
      <div>
        <DivMediaPlayer className="DivMediaPlayer">
          <div style={{ width: '10em' }}>
            <PrevIcon onClick={this.prevSong} type="button" />
            {playing ? (<PauseIcon onClick={this.playPause} type="button" />)
              : (<PlayIcon onClick={this.playPause} type="button" />)}
            <NextIcon onClick={this.nextSong} type="button" />
          </div>

          <DivMediaMiddle>
            <RepeatIcon
              onClick={this.toggleLoop}
              loopOn={loop}
            />
            <DivTitle id="MediaDivTitle">
              {passedID === undefined ? (' ') : (passedSongTitle)}
            </DivTitle>
            <DivDur>
              {passedID === undefined ? (' ') : (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: '2em' }}>
                    {`${convertString(playedSec)}`}
                  </div>
                  <div>
                    {` / ${convertString(passsedDur)}`}
                  </div>
                </div>)}
            </DivDur>
            <input // Seeker
              style={{
                '--percent': `${played * 100}%`,
                marginTop: '0.3em',
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
          </DivMediaMiddle>
          <DivMediaImg>
            <Img
              src={passedID === undefined ? HNDLogo : passedImg}
              alt=""
            />
          </DivMediaImg>
        </DivMediaPlayer>
        <ReactPlayer
          ref={this.ref}
          url={url}
          playing={playing}
          loop={loop}
          height="0em"
          width="0em"
          onPause={this.onPause}
          onEnded={this.onEnded}
          onError={() => console.log('error loading audio')}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          onReady={this.onReady}
        />
      </div>
    );
  }
}
