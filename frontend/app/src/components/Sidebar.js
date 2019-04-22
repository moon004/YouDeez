import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import DivMenu from '../styling/Sidebar.style';
import ydLogo from '../assets/Webapp_newlogo.svg';
import { RenderSearchOrLib } from './RetObject';
import Search from './Search';

const SBContent = (props) => {
  const { currentState } = props;
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
      >
        Search
      </DivMenu>
      <DivMenu
        className="SBMenuDiv"
        currentState={currentState === 'Library'}
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
    const { onObjTap } = this.props;
    onObjTap(value);
  }

  render() {
    const {
      currentState,
      onMenuTap,
      apiReqState,
      onObjClick,
      onGetAutoComp,
      onSubmitSearch,
      autoComplete,
    } = this.props;
    return (
      <Sidebar
        sidebar={<SBContent currentState={currentState} />}
        sidebarClassName="MainSideBar"
        contentClassName="SBContent"
        open
        docked
        shadow
      >
        <div className="MainDiv">
          <div className="MainDivTop">
            <Search
              className="SearchBar"
              handleSubmit={onSubmitSearch}
              searchState={apiReqState}
              onGetAutoComp={onGetAutoComp}
              autoComplete={autoComplete}
            />
          </div>
          <RenderSearchOrLib
            currentState={currentState}
            onObjClick={onObjClick}
            searchState={apiReqState}
            onObjTap={onMenuTap}
          />
        </div>
      </Sidebar>
    );
  }
}

export default MainSideBar;
