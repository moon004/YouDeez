import React, { Component } from 'react';
import { myLibPropTypes, myLibDefaultProps } from '../props';
import { getDB } from '../utils/indexdb';
import { DB_STORE_NAME } from '../constants/constant';
import MediaPlayer from './Mediaplayer';
import convertString, { addDot } from '../utils/converter';
import '../index.css';

import {
  DivLib,
  DivObj,
  StyledScrollbarLib,
  DivObjTitle,
  DivObjArtist,
} from '../styling/MyLibrary.style';


class MyLibrary extends Component {
  static propTypes = myLibPropTypes

  static defaultProps = myLibDefaultProps

  constructor() {
    super();
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.state = {
      blobUrl: '',
      dbItem: [],
      songObject: {},
    };
    this.callUpdateDB();
  }

  shouldComponentUpdate(nextprops, nextstate) {
    const { downloadObject } = this.props;
    if (nextprops.downloadObject.state !== downloadObject.state) {
      this.callUpdateDB();
    }
    const { dbItem, blobUrl } = this.state;
    if (nextstate.dbItem !== dbItem) {
      return true;
    }
    if (nextstate.blobUrl !== blobUrl) {
      return true;
    }
    return false;
  }

  handlePlaySong = value => () => {
    console.log('handlePlaysong', value);
    const url = URL.createObjectURL(value.bit);
    this.setState({
      blobUrl: url,
      songObject: value,
    });
    console.log('BLOB URL IN handler', this.state.blobUrl);
  };

  handleThisSong = (value) => {
    console.log('handleThisSong', value);
    const url = URL.createObjectURL(value.bit);
    this.setState({
      blobUrl: url,
      songObject: value,
    });
    console.log('BLOB URL IN handler', this.state.blobUrl);
  };


  callUpdateDB() {
    const indb = getDB();
    indb.then(db => db.transaction(DB_STORE_NAME)
      .objectStore(DB_STORE_NAME)
      .getAll()).then((obj) => {
      console.log('current db item', obj);
      this.setState({
        dbItem: obj,
      });
    });
  }

  renderThumb = (props) => {
    const thumbStyle = {
      backgroundColor: 'black',
    };
    return (
      <div {...props} style={{ ...thumbStyle }} className="vertical-thumb" />
    );
  }

  render() {
    const {
      blobUrl, // For Playing the audio
      dbItem, // For Loading the List
      songObject, // Object for MediaPlayer
    } = this.state;
    console.log('component rendered', blobUrl);
    let itemList = [];
    if (typeof dbItem[0] !== 'undefined') {
      itemList = dbItem.map((item) => {
        const {
          dur, id,
        } = item; // make sure pass in obj
        return (
          <DivObj
            key={item.id}
            onClick={this.handlePlaySong(item)}
          >
            <div>
              {`${id} .`}
            </div>
            <DivObjTitle>
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
            }}
            >
              {convertString(dur)}
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
        <StyledScrollbarLib
          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
          thumbMinSize={50}
        >
          {itemList}
        </StyledScrollbarLib>
      </DivLib>
    );
  }
}

export default MyLibrary;
