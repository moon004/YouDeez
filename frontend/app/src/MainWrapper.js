import React, { Component } from 'react';
import { connect } from 'react-redux';
import { propTypes, defaultProps } from './props';
import {
  updateMediaObjAct,
  updateCurrentMediaAct,
  updateDownloadAct,
}
  from './action/media-action';
import {
  fetchObjStartAct,
  getAutoCompAct,
} from './action/search-action';

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
          passsedDur: dur,
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
        passsedDur: dur,
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
    } = this.props;
    const {
      blobUrl, // For Playing the audio
      PLArrayParent,
      dbItem,
      songObject,
      currentPL,
    } = this.state;
    return (
      <div>
        <div>
          <MainSideBar
            // For Search
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
            dbItem={dbItem}
            currentPL={currentPL}
            MWparents={this}
          />
          <div className="playerMainDiv">
            <MediaPlayer
              url={blobUrl}
              PassedObj={songObject}
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
});

const mapActionsToProps = {
  onUpdateMediaObj: updateMediaObjAct,
  onUpdateCurrentMedia: updateCurrentMediaAct,
  onDownloadMedia: updateDownloadAct,
  onSubmitSearch: fetchObjStartAct,
  onGetAutoComp: getAutoCompAct,
};

const ConnMainWrapper = connect(mapStateToProps, mapActionsToProps)(MainWrapper);
export default ConnMainWrapper;
