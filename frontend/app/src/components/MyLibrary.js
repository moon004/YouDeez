import React, { Component } from 'react';
import { myLibPropTypes, myLibDefaultProps } from '../props';
import MediaPlayer from './Mediaplayer';
import convertString, { addDot } from '../utils/converter';
import { callUpdateDB, callDeleteDB } from '../utils/indexdb';
import NewPlaylist from './NewPlaylist';
import '../index.css';

import {
  DivLib,
  DivObj,
  StyledScrollbarLib,
  DivObjTitle,
  DivObjArtist,
  DeleteIcon,
} from '../styling/MyLibrary.style';


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
      PLAddSong: false,
    };
    callUpdateDB(this);
  }

  shouldComponentUpdate(nextprops, nextstate) {
    const { downloadObject, PLAddSong } = this.props;
    if (nextprops.downloadObject.state !== downloadObject.state) {
      callUpdateDB(this);
    }
    const { dbItem, blobUrl } = this.state;
    if (nextstate.dbItem !== dbItem) {
      return true;
    }
    if (nextstate.blobUrl !== blobUrl) {
      return true;
    }
    if (nextstate.PLAddSong !== PLAddSong) {
      return true;
    }
    return false;
  }

  handlePlaySong = (value, index) => () => {
    const url = URL.createObjectURL(value.bit);
    const {
      album, artist, bit, dur, img, songTitle,
    } = value;
    this.setState({
      blobUrl: url,
      songObject: {
        passedID: index,
        passedAlbum: album,
        passedArtist: artist,
        passedBit: bit,
        passsedDur: dur,
        passedImg: img,
        passedSongTitle: songTitle,
      },
    });
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

  PLhandler = (bool) => {
    this.setState({
      PLAddSong: bool,
    });
  }

  render() {
    const {
      blobUrl, // For Playing the audio
      dbItem, // For Loading the List
      songObject, // Object for MediaPlayer
      PLAddSong, // Change to adding PL style
    } = this.state;
    let itemList = [];
    if (typeof dbItem[0] !== 'undefined') {
      itemList = dbItem.map((item, index) => {
        const { dur } = item; // make sure pass in obj
        return (
          // The Song Library List
          <DivObj
            id="divObj"
            key={item.id}
            PLAddSong={PLAddSong}
          >
            {`${index + 1} .`}
            <DivObjTitle
              onClick={this.handlePlaySong(item, index)}
            >
              <div style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              >
                {item.songTitle}
              </div>
              <DivObjArtist>
                {addDot(item.artist, 30)}
                <div style={{
                  margin: '-0.45em 0.3em -0.5em 0.3em',
                  fontSize: '2.5em',
                }}
                >
                  {item.album ? '·' : ' '}
                </div>
                {item.album ? addDot(item.album, 30) : ' '}
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
                onClick={this.handleDeleteSong(item)}
              />
            </div>
          </DivObj>
        );
      });
    }

    return (
      <DivLib>
        <MediaPlayer
          url={blobUrl}
          PassedObj={songObject}
          wholeDB={dbItem}
          playThis={this.handleThisSong}
        />
        <button
          type="button"
          className="playList"
          onClick={this.addPlaylist}
        >
          {'New Playlist'}
        </button>
        <NewPlaylist
          PLAddSonghandler={this.PLhandler}
        />
        <StyledScrollbarLib
          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
          thumbMinSize={30}
        >
          {itemList[0] === undefined ? (
            <div style={{ margin: '8em' }}>
              <div>
                {'Begin Searching and Download songs . . .'}
              </div>
            </div>
          )
            : (itemList)}
        </StyledScrollbarLib>
      </DivLib>
    );
  }
}

export default MyLibrary;
