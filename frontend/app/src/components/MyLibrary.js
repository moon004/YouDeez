import React, { Component } from 'react';
import { myLibPropTypes, myLibDefaultProps } from '../props';
import MediaPlayer from './Mediaplayer';
import { convertString, addDot } from '../utils/converter';
import { callUpdateDB, callDeleteDB } from '../utils/indexdb';
import NewPlaylistInput from './NewPlaylist';
import '../index.css';

import {
  DivLib,
  DivObj,
  StyledScrollbarLib,
  DivObjTitle,
  DivObjArtist,
  DeleteIcon,
} from '../styling/MyLibrary.style';


const itemList = (parent) => {
  const {
    dbItem,
    PLAddSong,
    PLArrayParent,
    currentPL,
  } = parent.state;
  console.log('PLArrayParent', PLArrayParent, currentPL, dbItem);
  if (currentPL !== 0) {
    const songLists = dbItem.filter((obj) => {
      const match = PLArrayParent[currentPL].items.some(id => id === obj.id);
      return match;
    }).map((item, index) => {
      const {
        dur, id, songTitle, album,
      } = item; // make sure pass in obj
      return (
      // The Song Library List
        <DivObj
          className="divObj"
          key={id}
          PLAddSong={PLAddSong[index]}
        >
          <div style={{
            width: '4em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          >
            {`${index + 1} .`}
          </div>
          <DivObjTitle
            onClick={parent.handlePlaySong(item, id)}
          >
            <div style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            >
              {songTitle}
            </div>
            <DivObjArtist>
              {addDot(item.artist, 30)}
              <div style={{
                margin: '-0.45em 0.3em -0.5em 0.3em',
                fontSize: '2.5em',
              }}
              >
                {album ? '·' : ' '}
              </div>
              {album ? addDot(album, 30) : ' '}
            </DivObjArtist>
          </DivObjTitle>
          <div style={{
            fontWeight: 100,
            fontSize: '0.8em',
            letterSpacing: '0.1em',
            marginTop: '0.1em',
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            {convertString(dur)}
            <DeleteIcon
              onClick={parent.handleDeleteSong(item)}
            />
          </div>
        </DivObj>
      );
    });
    return songLists;
  }
  return [];
};

class MyLibrary extends Component {
  // IMPORTANT!! PL === Playlist
  static propTypes = myLibPropTypes

  static defaultProps = myLibDefaultProps

  constructor() {
    super();
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.state = {
      blobUrl: '',
      dbItem: [],
      songObject: {},
      PLAddSong: [],
      // Always start with main PL, 0=Void=As a reset for fade in to work
      currentPL: 1,
      tmpCurrentPL: 1,
      tmpPLArray: [],
      PLArrayParent: [],
    };
    callUpdateDB(this);
  }

  shouldComponentUpdate(nextprops, nextstate) {
    const { downloadObject, PLAddSong } = this.props;
    if (nextprops.downloadObject.state !== downloadObject.state) {
      callUpdateDB(this);
    }
    const { dbItem, blobUrl, currentPL } = this.state;
    if (nextstate.dbItem !== dbItem) {
      return true;
    }
    if (nextstate.blobUrl !== blobUrl) {
      return true;
    }
    if (nextstate.PLAddSong !== PLAddSong) {
      return true;
    }
    if (nextstate.currentPL !== currentPL) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { currentPL, tmpCurrentPL } = this.state;
    if (currentPL === 0) {
      this.setState({
        currentPL: tmpCurrentPL,
      });
    }
  }

  handlePlaySong = (value, id) => () => {
    const { PLAddSong, tmpPLArray } = this.state;
    const {
      album, artist, bit, dur, img, songTitle,
    } = value;
    const url = URL.createObjectURL(value.bit);
    if (!PLAddSong) {
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
      tmpPLArray.push(id);
      this.setState({
        tmpPLArray,
      });
    }
  };

  handleThisSong = (value, PassedID) => {
    const url = URL.createObjectURL(value.bit);
    const {
      album, artist, bit, dur, img, songTitle,
    } = value;
    this.setState({
      blobUrl: url,
      songObject: {
        passedID: PassedID,
        passedAlbum: album,
        passedArtist: artist,
        passedBit: bit,
        passsedDur: dur,
        passedImg: img,
        passedSongTitle: songTitle,
      },
    });
  };

  handleDeleteSong = item => () => {
    callDeleteDB(item.id);
    callUpdateDB(this);
  }

  renderThumb = (props) => {
    const thumbStyle = {
      backgroundColor: 'rgba(140, 140, 140, 0.6)',
      borderRadius: '1em',
    };
    return (
      <div {...props} style={{ ...thumbStyle }} className="vertical-thumb" />
    );
  }

  PLAddhandler = (bool) => {
    console.log('PLAddSong', bool);
    this.setState({
      PLAddSong: bool,
    });
  }

  addPlaylisthandler = PLname => () => {
    const { tmpPLArray, PLArrayParent } = this.state;
    PLArrayParent.push({
      name: PLname,
      items: tmpPLArray,
    });
    this.setState({
      PLArrayParent,
    });
  }

  handlePLChange = value => () => {
    this.setState({
      currentPL: 0,
      tmpCurrentPL: value,
    });
  };

  render() {
    const {
      blobUrl, // For Playing the audio
      dbItem, // For Loading the List
      songObject, // Object for MediaPlayer
      PLArrayParent, // Consists of id {name: '', items:[]}
    } = this.state;
    let songList = [];
    if (typeof dbItem[0] !== 'undefined') {
      songList = itemList(this);
    }
    const playlistName = PLArrayParent.map((item, index) => (
      <button
        type="button"
        className="playlistName"
        onClick={this.handlePLChange(index)}
      >
        {item.name}
      </button>
    ));
    return (
      <DivLib>
        <MediaPlayer
          url={blobUrl}
          PassedObj={songObject}
          wholeDB={dbItem}
          playThis={this.handleThisSong}
        />

        <NewPlaylistInput
          PLAddSonghandler={this.PLAddhandler}
          addPlaylisthandler={this.addPlaylisthandler}
        />
        <br />
        <div className="playlistDiv">
          {playlistName}
        </div>
        <StyledScrollbarLib

          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
          thumbMinSize={30}
        >
          {songList[0] === undefined ? (
            <div style={{ margin: '8em' }}>
              <div>
                {'Begin Searching and Download songs . . .'}
              </div>
            </div>
          )
            : (
              <div className="wholeSongList">
                {songList}
              </div>
            )}
        </StyledScrollbarLib>
      </DivLib>
    );
  }
}

export default MyLibrary;
