import React, { Component } from 'react';
import DivMenu from '../styling/Sidebar.style';
import ydLogo from '../assets/Webapp_newlogo.svg';
import {
  PLbutton,
} from '../styling/MyLibrary.style';
import { GithubIcon } from '../styling/MainWrapper.style';
import {
  callUpdateDB,
  callDeletePL,
} from '../utils/indexdb';

class SidebarContent extends Component {
  componentDidUpdate() {
    const { currentPL, tmpCurrentPL } = this.props.MWparents.state;
    if (currentPL === 0) {
      this.props.MWparents.setState({
        currentPL: tmpCurrentPL,
      });
    }
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

  handlePLDelete = ind => () => {
    callDeletePL(ind, this.props.MWparents);
    callUpdateDB(this.props.MWparents);
  };

  render() {
    const {
      currentState,
      clicked,
      MWparents: {
        state: {
          PLArrayParent,
          hidePLBut,
          currentPL,
        },
      },
      // onMenuTap,
      // apiReqState,
      // onObjClick,
      // onGetAutoComp,
      // onSubmitSearch,
      // autoComplete,
      // MediaObject,
      // downloadObject,
      // onDownload,
    } = this.props;
    const playlistName = PLArrayParent.map((item, index) => (
      <PLbutton
        type="button"
        key={item.name}
        // hidePLBut is just to hide the button on drag
        hidePLBut={hidePLBut[index]}
        className="playlistName"
        selected={index === currentPL} // is current PL button clicked?
        onClick={this.handlePLChange(index)}
        draggable={index !== 1}
      >
        {item.name}
        <div
          className="droppableClass"
          onClick={this.handlePLDelete(index)}
        />
      </PLbutton>
    ));
    return (
      <div className="SBMenuMainDiv">
        <img
          id="youdeezLogo"
          alt=""
          src={ydLogo}
        />
        {/* <download progress div /> */}
        <DivMenu
          className="SBMenuDiv"
          currentState={currentState === 'Search'}
          onClick={clicked('Search')}
        >
          Search
        </DivMenu>
        <DivMenu
          className="SBMenuDiv"
          currentState={currentState === 'Library'}
          onClick={clicked('Library')}
        >
          My Library
        </DivMenu>
        <div
          className="playlistDiv"
          selected={currentPL === 1}
        >
          {playlistName}
        </div>
        <a
          href="https://github.com/moon004/YouDeez"
          target="_blank"
          rel="noopener noreferrer"
          id="footer-a"
        >
          <GithubIcon />
        </a>
      </div>
    );
  }
}

export default SidebarContent;
