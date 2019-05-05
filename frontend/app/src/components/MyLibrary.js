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
  callDeletePLIDdb,
  addToDBPL,
} from '../utils/indexdb';
import NewPlaylistInput from './NewPlaylist';
import '../index.css';

import {
  DivLib,
  DivObj,
  // StyledScrollbarLib,
  DivObjTitle,
  DivObjArtist,
  DeleteIcon,
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
  } = parent.props.MWparents.state;
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

  shouldComponentUpdate(nextprops) {
    const { PLAddSong } = this.props;
    const { dbItem, currentPL } = this.props;
    if (nextprops.dbItem !== dbItem) {
      console.log('updated library, dbItem');
      return true;
    }
    if (nextprops.PLAddSong !== PLAddSong) {
      return true;
    }
    if (nextprops.currentPL !== currentPL) {
      console.log('UPDATED the Library, currentPL');
      return true;
    }
    return false;
  }

  handleDeleteSong = (item, PL) => () => {
    const { PLArrayParent } = this.props.MWparents.state;
    if (PL === 1) {
      callDeleteDB(item.id);
    } else {
      callDeletePLIDdb(indOfArr(PLArrayParent[PL].items,
        item.id), PL);
    }
    callUpdateDB(this.props.MWparents);
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
    const { PLAddSongArr } = this.props.MWparents.state;
    this.props.MWparents.setState({
      PLAddSong: bool,
    });
    if (!bool) {
      PLAddSongArr.fill(false);
      this.props.MWparents.setState({
        currentPL: 1,
        PLAddSongArr,
      });
    } else {
      PLAddSongArr.fill(true);
      this.props.MWparents.setState({
        PLAddSongArr,
      });
    }
  }

  addPlaylisthandler = (PLname) => {
    const {
      tmpPLArray,
      PLArrayParent,
      PLAddSongArr,
    } = this.props.MWparents.state;
    PLArrayParent.push({
      name: addDot(PLname, 12),
      items: tmpPLArray,
    });
    PLAddSongArr.fill(true);
    this.props.MWparents.setState({
      PLArrayParent,
      tmpPLArray: [],
      PLAddSongArr,
      PLAddSong: true,
    });
    addToDBPL(PLArrayParent);
  }

  handlePLChange = value => () => {
    const { PLAddSong } = this.props.MWparents.state;
    if (PLAddSong) {
      this.props.MWparents.setState({
        currentPL: 0,
        tmpCurrentPL: value,
      });
    }
  };

  render() {
    const { PLArrayParent, currentPL, dbItem } = this.props.MWparents.state;
    let songList = [];
    if (typeof dbItem[0] !== 'undefined') {
      songList = itemList(this);
    }

    return (
      <DivLib>
        <NewPlaylistInput
          PLAddSonghandler={this.PLAddhandler}
          stateFromParent={this.props.MWparents.state}
          addPlaylisthandler={this.addPlaylisthandler}
          currentPLName={PLArrayParent[currentPL].name}
        />
        <br />
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
      </DivLib>
    );
  }
}

export default MyLibrary;
