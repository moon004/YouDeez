import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateMediaType, updateCurrentMedia }
  from './action/media-action';
import { fetchObjStart, getAutoComp } from './action/search-action';

// import ResultObj from './Object';
import Search from './components/Search';
import DivTap from './components/DivTap';
import MyLibrary from './components/MyLibrary';
import Media from './components/Media';
import Div from './styling/MainWrapper.style';


export class MainWrapper extends Component {
  constructor() {
    super();
    this.state = {
      // MediaObject: [],
    };
    this.onUpdateMediaType = this.onUpdateMediaType.bind(this);
    this.ObjTap = this.ObjTap.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onGetAutoComp = this.onGetAutoComp.bind(this);
  }


  onUpdateMediaType(event) {
    const { onUpdateMediaType } = this.props;
    onUpdateMediaType(event.target.value);
  }

  onSubmitSearch(event) {
    console.log('Search Fire!');
    const { onSubmitSearch } = this.props;
    onSubmitSearch(event.target.value);
  }

  onGetAutoComp = (value) => {
    const { onGetAutoComp } = this.props;
    onGetAutoComp(value);
  }

  ObjTap(e) {
    const { onUpdateCurrentMedia } = this.props;
    onUpdateCurrentMedia(e.target.value);
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
        <div>
          <Search
            handleSubmit={this.onSubmitSearch}
            searchState={apiReqState}
            getAutoComp={this.onGetAutoComp}
            autoComplete={autoComplete}
          />
          <DivTap
            searchState={apiReqState}
            tapState={currentMediaTap}
          />
        </div>
        <div>
          <Media cMedia={MediaObject} />
        </div>
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
      MediaData: PropTypes.array,
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
  onUpdateMediaType: PropTypes.func,
  onUpdateCurrentMedia: PropTypes.func,
  onSubmitSearch: PropTypes.func,
  onGetAutoComp: PropTypes.func,
};

MainWrapper.defaultProps = {
  MediaObject: PropTypes.shape(
    {
      title: '',
      MediaType: '',
      MediaData: [],
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
  onUpdateMediaType: () => {},
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
  onUpdateMediaType: updateMediaType,
  onUpdateCurrentMedia: updateCurrentMedia,
  onSubmitSearch: fetchObjStart,
  onGetAutoComp: getAutoComp,
};

const ConnMainWrapper = connect(mapStateToProps, mapActionsToProps)(MainWrapper);
export default ConnMainWrapper;
