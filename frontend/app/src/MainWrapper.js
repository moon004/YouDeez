import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultProps, propTypes } from './props';
import {
  updateCurrentMediaAct, updateDownloadAct, updateInputFocus, updateMediaObjAct,
} from './action/media-action';
import { fetchObjStartAct, getAutoCompAct } from './action/search-action';
// import ResultObj from './Object';
import './index.css';
import './styling/media.scss';
import './styling/mediaplayer.scss';
import './styling/maindiv.scss';
import './styling/sidebar.scss';
import './styling/player.scss';
// import DivTap from './components/DivTap';
import MainSideBar from './components/Sidebar';
import MediaPlayer from './components/Mediaplayer';
import { callInitDB } from './utils/indexdb';
// import MyLibrary from './components/MyLibrary';
// import Media from './components/Media';
// import { RenderSearchOrLib } from './components/RetObject';

/*
  React-Redux guide, On this.FunctionCalled, will trigger
  a dispatch of action in in one of mapActionsToProps.
  For Example, onGetAutoComp, will first call this.onGetAutoComp
  to trigger onGetAutoComp to dispatch an action,
  which has a type and payload. An action will cause reducer of that type to get called.
  After that, it comes to index.js, and then update the store and mapStateToProps will
  gets called and update all the states, and hence this.props will cause a render on
  the MainWrapper.js
*/
export class MainWrapper extends Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor() {
    super();
    this.onUpdateMediaType = this.onUpdateMediaObj.bind(this);
    this.onObjTap = this.onObjTap.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onGetAutoComp = this.onGetAutoComp.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.state = {
      blobUrl: '',
      PLArrayParent: [{
        name: 'Void',
        items: [],
      }, {
        name: 'Main',
        items: [],
      }],
      dbItem: [],
      songObject: {},
      currentPL: 1,
      PLAddSong: true,
      tmpPLArray: [],
      tmpCurrentPL: 1,
      PLAddSongArr: [true],
      hidePLBut: [],
    };
    callInitDB(this);
  }

  // trigger from clicking song title
  handlePlaySong = (selectedDB, id, index) => () => {
    const { PLAddSong, tmpPLArray, PLAddSongArr } = this.state;
    const {
      album, artist, bit, dur, img, songTitle,
    } = selectedDB;
    const url = URL.createObjectURL(selectedDB.bit);
    // PLAddSong is TRUE when on normal state which is click to play song
    // PLAddSong is FALSE when adding songs to playlist
    if (PLAddSong) {
      this.setState({
        blobUrl: url,
        songObject: {
          passedID: id,
          passedAlbum: album,
          passedArtist: artist,
          passedBit: bit,
          passedDur: dur,
          passedImg: img,
          passedSongTitle: songTitle,
        },
      });
    } else {
      // for turning opacity to 1 on PL creation
      tmpPLArray.push(id);
      PLAddSongArr[index] = true;
      this.setState({
        tmpPLArray,
      });
    }
  };

  // for updating input focus, main for shortcut to work well...
  onInputFocus = (value) => {
    const { onInputFocus } = this.props;
    onInputFocus(value);
  }

  onUpdateMediaObj = (value) => {
    const { onUpdateMediaObj } = this.props;
    onUpdateMediaObj(value);
  }

  onSubmitSearch = (value) => {
    const { onSubmitSearch } = this.props;
    onSubmitSearch(value);
  }

  onGetAutoComp = (value) => {
    const { onGetAutoComp } = this.props;
    onGetAutoComp(value);
  }

  onObjTap = (value) => {
    const { onUpdateCurrentMedia } = this.props;
    onUpdateCurrentMedia(value);
  }

  clickDownload = (value) => {
    const { onDownloadMedia } = this.props;
    onDownloadMedia(value, this);
  }

  // triggered from nextSong()
  handleThisSong = (selectedDB) => {
    const url = URL.createObjectURL(selectedDB.bit);
    const {
      album, artist, bit, dur, img, songTitle, id,
    } = selectedDB;

    this.setState({
      blobUrl: url,
      songObject: {
        passedID: id,
        passedAlbum: album,
        passedArtist: artist,
        passedBit: bit,
        passedDur: dur,
        passedImg: img,
        passedSongTitle: songTitle,
      },
    });
  };

  render() {
    const {
      MediaObject,
      currentMediaTap,
      apiReqState,
      autoComplete,
      downloadObject,
      inputFocus,
    } = this.props;
    const {
      blobUrl, // For Playing the audio
      PLArrayParent,
      dbItem,
      songObject,
      currentPL,
      PLAddSong,
      PLAddSongArr,
    } = this.state;
    return (
      <div>
        <div>
          <MainSideBar
            // For Search
            onInputFocus={this.onInputFocus}
            onGetAutoComp={this.onGetAutoComp}
            onSubmitSearch={this.onSubmitSearch}
            autoComplete={autoComplete}
            // For DivTap
            onMenuTap={this.onObjTap}
            currentState={currentMediaTap}
            onObjClick={this.onUpdateMediaObj}
            apiReqState={apiReqState}
            // For Media
            MediaObject={MediaObject}
            onDownload={this.clickDownload}
            downloadObject={downloadObject}
            PLAddSongArr={PLAddSongArr}
            PLAddSong={PLAddSong}
            dbItem={dbItem}
            blobUrl={blobUrl}
            currentPL={currentPL}
            MWparents={this}
          />
          <div className="playerMainDiv">
            <MediaPlayer
              url={blobUrl}
              PassedObj={songObject}
              inputFocus={inputFocus}
              CurrentPL={PLArrayParent[currentPL].items}
              wholeDB={dbItem}
              playThis={this.handleThisSong}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  MediaObject: state.MediaObject,
  currentMediaTap: state.currentMediaTap,
  apiReqState: state.apiReqState,
  autoComplete: state.autoComplete,
  downloadObject: state.downloadObject,
  inputFocus: state.inputFocus,
});

const mapActionsToProps = {
  onUpdateMediaObj: updateMediaObjAct,
  onInputFocus: updateInputFocus,
  onUpdateCurrentMedia: updateCurrentMediaAct,
  onDownloadMedia: updateDownloadAct,
  onSubmitSearch: fetchObjStartAct,
  onGetAutoComp: getAutoCompAct,
};

const ConnMainWrapper = connect(mapStateToProps, mapActionsToProps)(MainWrapper);
export default ConnMainWrapper;
