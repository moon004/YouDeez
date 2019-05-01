import React, { Component } from 'react';
import { myLibPropTypes, myLibDefaultProps } from '../props';
import {
  convertString,
  addDot,
  indOfObjDB,
  indOfArr,
} from '../utils/tools';
import {
  callUpdateDB,
  callDeleteDB,
  callInitDB,
  callDeletePLIDdb,
  addToDBPL,
  callDeletePL,
} from '../utils/indexdb';
import NewPlaylistInput from './NewPlaylist';
import '../index.css';

import {
  DivLib,
  DivObj,
  StyledScrollbarLib,
  DivObjTitle,
  DivObjArtist,
  DeleteIcon,
  PLbutton,
  PLbuttonDiv,
  DivSongDur,
  Div,
} from '../styling/MyLibrary.style';


const itemList = (parent) => {
  const {
    dbItem,
    PLAddSongArr,
    PLArrayParent,
    currentPL,
    songObject: { passedID },
  } = parent.state;
  const { MWparents } = parent.props;
  if (currentPL !== 0) {
    const sList = [];
    PLArrayParent[currentPL].items.forEach((id, index) => {
      const item = indOfObjDB(dbItem, id);
      const { dur, songTitle, album } = item;
      sList.push(
        <DivObj
          className="divObj"
          key={id}
          playingThis={id === passedID}
          PLAddSong={PLAddSongArr[index]}
        >
          <div className="songIndex">
            {`${index + 1} .`}
          </div>
          <DivObjTitle
            onClick={MWparents.handlePlaySong(item, id, index)}
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
              <Div>{item.artist}</Div>
              <div style={{
                margin: '-0.45em 0.3em -0.5em 0.3em',
                fontSize: '2.5em',
              }}
              >
                {album ? '·' : ''}
              </div>
              <Div>{album || ''}</Div>
            </DivObjArtist>
          </DivObjTitle>
          <DivSongDur playingThis={id === passedID}>
            {convertString(dur)}
            <DeleteIcon
              onClick={parent.handleDeleteSong(item, currentPL)}
            />
          </DivSongDur>
        </DivObj>,
      );
    });
    return sList;
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
      PLAddSong: true, // For switching to add song
      PLAddSongArr: [true], // for setting boolean array
      // Always start with main PL, 0=Void=As a reset for fade in to work
      currentPL: 1,
      tmpCurrentPL: 1,
      tmpPLArray: [],
      PLArrayParent: [{
        name: 'Void',
        items: [],
      }, {
        name: 'Main',
        items: [],
      }],
      dropClassName: 'droppableClass',
      hidePLBut: [],
      hoveringTrash: false,
    };
    callInitDB(this);
  }

  shouldComponentUpdate(nextprops, nextstate) {
    const { downloadObject, PLAddSong } = this.props;
    if (nextprops.downloadObject.state !== downloadObject.state) {
      callUpdateDB(this);
      return true;
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

  handleDeleteSong = (item, PL) => () => {
    const { PLArrayParent } = this.state;
    if (PL === 1) {
      callDeleteDB(item.id);
    } else {
      callDeletePLIDdb(indOfArr(PLArrayParent[PL].items,
        item.id), PL);
    }
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

  renderHorThumb = () => (
    <div style={{ display: 'none' }} />
  )

  // Called when PL input !== 0
  PLAddhandler = (bool) => {
    const { PLAddSongArr } = this.state;
    this.setState({
      PLAddSong: bool,
    });
    if (!bool) {
      PLAddSongArr.fill(false);
      this.setState({
        currentPL: 1,
        PLAddSongArr,
      });
    } else {
      PLAddSongArr.fill(true);
      this.setState({
        PLAddSongArr,
      });
    }
  }

  addPlaylisthandler = (PLname) => {
    const {
      tmpPLArray,
      PLArrayParent,
      PLAddSongArr,
    } = this.state;
    PLArrayParent.push({
      name: addDot(PLname, 17),
      items: tmpPLArray,
    });
    PLAddSongArr.fill(true);
    this.setState({
      PLArrayParent,
      tmpPLArray: [],
      PLAddSongArr,
      PLAddSong: true,
    });
    addToDBPL(PLArrayParent);
  }

  handlePLChange = value => () => {
    const { PLAddSong } = this.state;
    if (PLAddSong) {
      this.setState({
        currentPL: 0,
        tmpCurrentPL: value,
      });
    }
  };

  onDragStart = index => (e) => {
    e.dataTransfer.setData('index', index);
    e.dataTransfer.effectAllowed = 'copyMove';
    const { hidePLBut } = this.state;
    hidePLBut[index] = true;
    this.setState({
      hidePLBut,
      dropClassName: 'droppableClass',
    });
  }

  onDragEnd = index => (e) => {
    e.preventDefault();
    const { hidePLBut } = this.state;
    hidePLBut[index] = false;
    this.setState({
      hidePLBut,
    });
  }

  onDragEnter = (e) => {
    e.preventDefault();
    this.setState({
      dropClassName: 'droppableClassHov',
    });
  }

  onDragLeave = (e) => {
    e.preventDefault();
    this.setState({
      dropClassName: 'droppableClass',
    });
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e) => {
    const ind = e.dataTransfer.getData('index');
    callDeletePL(ind, this);
    callUpdateDB(this);
  }

  handleHover = () => {
    const { hoveringTrash } = this.state;
    this.setState({
      hoveringTrash: !hoveringTrash,
    });
  }

  render() {
    const {
      dbItem, // For Loading the List
      PLArrayParent, // Consists of id {name: '', items:[]}
      currentPL,
      dropClassName,
      hidePLBut,
      hoveringTrash,
    } = this.state;
    let songList = [];
    if (typeof dbItem[0] !== 'undefined') {
      songList = itemList(this);
    }
    const playlistName = PLArrayParent.map((item, index) => (
      <PLbutton
        type="button"
        key={item.name}
        hidePLBut={hidePLBut[index]}
        className="playlistName"
        selected={index === currentPL} // is current PL button clicked?
        onClick={this.handlePLChange(index)}
        draggable={index !== 1}
        onDragStart={this.onDragStart(index)}
        onDragEnd={this.onDragEnd(index)}
      >
        {item.name}
      </PLbutton>
    ));
    return (
      <DivLib>
        <NewPlaylistInput
          PLAddSonghandler={this.PLAddhandler}
          stateFromParent={this.state}
          addPlaylisthandler={this.addPlaylisthandler}
        />
        <div
          className={`${dropClassName}`}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        />
        <div className="trashInfo">
          {hoveringTrash ? 'Drag and drop your playlist here to remove it' : ''}
        </div>
        <br />
        <PLbuttonDiv
          className="playlistDiv"
          selected={currentPL === 1}
        >
          {playlistName}
        </PLbuttonDiv>
        <StyledScrollbarLib
          renderThumbVertical={this.renderThumb}
          renderThumbHorizontal={this.renderHorThumb}
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
