import React, { Component } from 'react';
import './MainWrapper.css';
import { connect } from 'react-redux';
import { updateMediaType, updateCurrentMedia }
  from './action/media-action';
import { fetchObjStart, getAutoComp } from './action/search-action';

import ResultObj from './Object';
import Search from './components/Search';
import DivTap from './components/DivTap';
import MyLibrary from './components/MyLibrary';
import Media from './components/Media';


export class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {
      MediaObject: [],
    };
    this.onUpdateMediaType = this.onUpdateMediaType.bind(this);
    this.ObjTap = this.ObjTap.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onGetAutoComp = this.onGetAutoComp.bind(this);
    // Dummy Data
    for (let i = 1; i < 4; i++) {
      this.state.MediaObject = this.state.MediaObject.concat([{
        name: i,
      }]);
    }
  }

  ObjTap(e) {
    this.props.apiReq();
    this.props.onUpdateCurrentMedia(e.target.value);
  }

  onUpdateMediaType(event) {
    this.props.onUpdateMediaType(event.target.value);
  }

  onSubmitSearch(event) {
    console.log('Search Fire!');
    this.props.onSubmitSearch(event.target.value);
  }

  onGetAutoComp = (value) => {
    this.props.onGetAutoComp(value);
  }


  render() {
    return (
      <div>
        <div>
          <Search
            handleSubmit={this.onSubmitSearch}
            searchState={this.props.apiReqState}
            getAutoComp={this.onGetAutoComp}
            autoComplete={this.props.autoComplete}
          />
          <DivTap searchState={this.props.apiReqState} />
        </div>
        <div>
          <Media cMedia={this.props.whichMedia} />
        </div>
        <MyLibrary />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  whichMedia: state.whichMedia,
  currentMediaTap: state.currentMediaTap,
  apiReqState: state.apiReqState,
  autoComplete: state.autoComplete,
});
  // apiReqState
  // fetchState: '',
  // error: null,
  // data: []


const mapActionsToProps = {
  onUpdateMediaType: updateMediaType,
  onUpdateCurrentMedia: updateCurrentMedia,
  onSubmitSearch: fetchObjStart,
  onGetAutoComp: getAutoComp,
};

export default connect(mapStateToProps, mapActionsToProps)(MainWrapper);
