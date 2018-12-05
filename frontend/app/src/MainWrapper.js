import React, { Component } from 'react';
import { connect } from 'react-redux';
import { propTypes, defaultProps } from './props';
import {
  updateMediaObjAct,
  updateCurrentMediaAct,
  updateDownloadAct,
}
  from './action/media-action';
import {
  fetchObjStartAct,
  getAutoCompAct,
} from './action/search-action';

// import ResultObj from './Object';
import './index.css';
import Search from './components/Search';
import DivTap from './components/DivTap';
import MyLibrary from './components/MyLibrary';
import Media from './components/Media';
import Div, { GithubIcon } from './styling/MainWrapper.style';


export class MainWrapper extends Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor() {
    super();
    this.onUpdateMediaType = this.onUpdateMediaObj.bind(this);
    this.onObjTap = this.onObjTap.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onGetAutoComp = this.onGetAutoComp.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  onUpdateMediaObj = (value) => {
    const { onUpdateMediaObj } = this.props;
    onUpdateMediaObj(value);
  }

  onSubmitSearch = (value) => {
    const { onSubmitSearch } = this.props;
    onSubmitSearch(value);
  }

  onGetAutoComp = (value) => {
    const { onGetAutoComp } = this.props;
    onGetAutoComp(value);
  }

  onObjTap = (value) => {
    const { onUpdateCurrentMedia } = this.props;
    onUpdateCurrentMedia(value);
  }

  clickDownload = (value) => {
    const { onDownloadMedia } = this.props;
    onDownloadMedia(value);
  }

  render() {
    const {
      MediaObject,
      currentMediaTap,
      apiReqState,
      autoComplete,
      downloadObject,
    } = this.props;
    return (
      <Div>
        <h1 id="big_title">YouDEEZ</h1>
        <h4 id="small_title">Ultimate free music streaming progressive web app</h4>
        <Search
          handleSubmit={this.onSubmitSearch}
          searchState={apiReqState}
          onGetAutoComp={this.onGetAutoComp}
          autoComplete={autoComplete}
        />
        <DivTap
          onObjClick={this.onUpdateMediaObj}
          searchState={apiReqState}
          onObjTap={this.onObjTap}
          tapState={currentMediaTap}
        />
        <Media
          mediaObj={MediaObject}
          onDownload={this.clickDownload}
          downloadObject={downloadObject}
        />
        <MyLibrary
          downloadObject={downloadObject}
        />

        <a href="https://github.com/moon004/YouDeez" id="footer-a">
          <GithubIcon />
          <div id="footer-text">Visit The GitHub Repository</div>
        </a>

      </Div>
    );
  }
}

const mapStateToProps = state => ({
  MediaObject: state.MediaObject,
  currentMediaTap: state.currentMediaTap,
  apiReqState: state.apiReqState,
  autoComplete: state.autoComplete,
  downloadObject: state.downloadObject,
});

const mapActionsToProps = {
  onUpdateMediaObj: updateMediaObjAct,
  onUpdateCurrentMedia: updateCurrentMediaAct,
  onDownloadMedia: updateDownloadAct,
  onSubmitSearch: fetchObjStartAct,
  onGetAutoComp: getAutoCompAct,
};

const ConnMainWrapper = connect(mapStateToProps, mapActionsToProps)(MainWrapper);
export default ConnMainWrapper;
