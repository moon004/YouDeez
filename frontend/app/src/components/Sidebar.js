import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { RenderSearchOrLib } from './RetObject';
import SidebarContent from './SidebarContent';

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
          <SidebarContent
            currentState={currentState}
            clicked={this.handleTapClick}
            {...this.props}
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
