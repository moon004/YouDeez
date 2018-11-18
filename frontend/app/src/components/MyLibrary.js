import React, { Component } from 'react';
import { myLibPropTypes, myLibDefaultProps } from '../props';
import { getDB } from '../utils/indexdb';
import { DB_STORE_NAME } from '../constants/constant';
import MediaPlayer from './Mediaplayer';


import {
  DivLib,
  DivObj,
  StyledScrollbarLib,
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
    const url = URL.createObjectURL(value);
    this.setState({
      blobUrl: url,
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
      blobUrl,
      dbItem,
    } = this.state;
    console.log('component rendered', blobUrl);
    let itemList = [];
    if (typeof dbItem[0] !== 'undefined') {
      itemList = dbItem.map((item) => {
        const {
          songTitle, img, dur, bit,
        } = item;
        return (
          <DivObj
            key={item.id}
            onClick={this.handlePlaySong(bit)}
          >
            {songTitle}
            {img}
            {dur}
          </DivObj>
        );
      });
    }
    return (
      <DivLib>
        <StyledScrollbarLib
          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
          thumbMinSize={50}
        >
          <MediaPlayer
            url={blobUrl}
          />
          {itemList}
        </StyledScrollbarLib>
      </DivLib>
    );
  }
}

export default MyLibrary;
