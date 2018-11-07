import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateMediaObjAct,
  updateCurrentMediaAct,
}
  from './action/media-action';
import { fetchObjStartAct, getAutoCompAct } from './action/search-action';

// import ResultObj from './Object';
import Search from './components/Search';
import DivTap from './components/DivTap';
import MyLibrary from './components/MyLibrary';
import Media from './components/Media';
import Div from './styling/MainWrapper.style';


export class MainWrapper extends Component {
  constructor() {
    super();
    this.onUpdateMediaType = this.onUpdateMediaObj.bind(this);
    this.onObjTap = this.onObjTap.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onGetAutoComp = this.onGetAutoComp.bind(this);
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


  render() {
    const {
      MediaObject,
      currentMediaTap,
      apiReqState,
      autoComplete,
    } = this.props;
    return (
      <Div>
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
        />
        <MyLibrary />
      </Div>
    );
  }
}


MainWrapper.propTypes = {
  MediaObject: PropTypes.shape(
    {
      title: PropTypes.string,
      MediaType: PropTypes.string,
      MediaData: PropTypes.shape(
        {
          Url: PropTypes.string,
        },
      ),
    },
  ),
  currentMediaTap: PropTypes.string,
  apiReqState: PropTypes.shape(
    {
      fetchState: PropTypes.string,
      data: PropTypes.array,
    },
  ),
  autoComplete: PropTypes.shape(
    {
      currentState: PropTypes.string,
      autoCompData: PropTypes.array,
    },
  ),
  onUpdateMediaObj: PropTypes.func,
  onUpdateCurrentMedia: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  onGetAutoComp: PropTypes.func,
};

MainWrapper.defaultProps = {
  MediaObject: PropTypes.shape(
    {
      MediaType: '',
      MediaData: {
        Url: '',
      },
    },
  ),
  currentMediaTap: '',
  apiReqState: PropTypes.shape(
    {
      fetchState: 'Search',
      data: [],
    },
  ),
  autoComplete: PropTypes.shape(
    {
      currentState: 'Youtube',
      autoCompData: [],
    },
  ),
  onUpdateMediaObj: () => {},
  onUpdateCurrentMedia: () => {},
  onSubmitSearch: () => {},
  onGetAutoComp: () => {},
};

const mapStateToProps = state => ({
  MediaObject: state.MediaObject,
  currentMediaTap: state.currentMediaTap,
  apiReqState: state.apiReqState,
  autoComplete: state.autoComplete,
});
  // apiReqState
  // fetchState: '',
  // error: null,
  // data: []

const mapActionsToProps = {
  onUpdateMediaObj: updateMediaObjAct,
  onUpdateCurrentMedia: updateCurrentMediaAct,
  onSubmitSearch: fetchObjStartAct,
  onGetAutoComp: getAutoCompAct,
};

const ConnMainWrapper = connect(mapStateToProps, mapActionsToProps)(MainWrapper);
export default ConnMainWrapper;
