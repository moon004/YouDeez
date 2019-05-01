import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import DivMenu from '../styling/Sidebar.style';
import ydLogo from '../assets/Webapp_newlogo.svg';
import { RenderSearchOrLib } from './RetObject';


const SBContent = (props) => {
  const { currentState, clicked } = props;
  console.log('currentState: ', currentState);

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
    </div>

  );
};

class MainSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
    };
  }

  handleTapClick = value => () => {
    const { onMenuTap } = this.props;
    onMenuTap(value);
  }

  render() {
    const {
      currentState,
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
    return (
      <Sidebar
        sidebar={(
          <SBContent
            currentState={currentState}
            clicked={this.handleTapClick}
          />
        )}
        sidebarClassName="MainSideBar"
        contentClassName="SBContent"
        open
        docked
        shadow
      >
        <div className="MainDiv">
          <RenderSearchOrLib
            {...this.props}
          />
        </div>
      </Sidebar>
    );
  }
}

export default MainSideBar;
