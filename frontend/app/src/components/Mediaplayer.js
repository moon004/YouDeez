import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import '../index.css';
import { convertString, indOfObjDB } from '../utils/tools';
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
  ShuffleIcon,
} from '../styling/MyLibrary.style';

export default class MediaPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      loop: false,
      shuffle: false,
      played: 0,
      seeking: false,
      playedSec: 0,
    };
  }
  // Add 'Global' listener for keyPress

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
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
    // if loop true, then It wont come to onEnded
    // Loop is the biggest priority
    const { loop, shuffle } = this.state;
    this.setState({ playing: loop });
    if (shuffle) {
      this.shuffleSong();
    } else {
      this.nextSong();
    }
  }

  shuffleSong = () => {
    // passedID is the Index of the song
    // passedID is NOT the Primary key
    const {
      wholeDB,
      playThis,
      CurrentPL,
    } = this.props;
    const random = Math.floor(Math.random() * CurrentPL.length);
    playThis(indOfObjDB(wholeDB, CurrentPL[random]), random);
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

  toggleShuffle = () => {
    const { shuffle } = this.state;
    this.setState({ shuffle: !shuffle });
  }

  playPause = () => {
    const { playing } = this.state;
    this.setState({ playing: !playing });
  }

  nextSong = () => {
    // passedID is the Index of the song
    // passedID is NOT the Primary key
    const {
      wholeDB,
      PassedObj: {
        passedID,
      },
      playThis,
      CurrentPL,
    } = this.props;
    if (passedID !== undefined) {
      const currentIndex = CurrentPL.indexOf(passedID);
      if (currentIndex < CurrentPL.length - 1) {
        playThis(indOfObjDB(wholeDB, CurrentPL[currentIndex + 1]));// on normal condition
      } else {
        playThis(indOfObjDB(wholeDB, CurrentPL[0])); // if on last song, return back to 0
      }
    }
  }

  prevSong = () => {
    const {
      wholeDB,
      PassedObj: {
        passedID,
      },
      playThis,
      CurrentPL,
    } = this.props;
    if (passedID !== undefined) {
      const currentIndex = CurrentPL.indexOf(passedID);
      if (currentIndex === 0) {
        // if at first song, jump to last song
        playThis(indOfObjDB(wholeDB, CurrentPL[CurrentPL.length - 1]));
      } else {
        playThis(indOfObjDB(wholeDB, CurrentPL[currentIndex - 1]));
      }
    }
  }

  handleKeyDown = (e) => {
    console.log('Keycode pressed: ', e.key);
    if (e.key === 'MediaTrackNext') {
      this.nextSong();
    } else if (e.key === 'MediaTrackPrevious') {
      this.prevSong();
    } else if (e.key === 'MediaPlayPause') {
      this.playPause();
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
    } = this.props;
    const {
      playing, loop, played, playedSec, shuffle,
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
              loopOn={loop}
              onClick={this.toggleLoop}
            />
            <ShuffleIcon
              id="shuffleIcon"
              ShuffleOn={shuffle}
              onClick={this.toggleShuffle}
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
                marginTop: '2em',
                width: '21em',
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
            <img
              id="mediaplayerImg"
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
          onKeyDown={this.handleKeyDown}
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
