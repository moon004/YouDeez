import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { divTapPropTypes, divTapDefaultProps } from '../props';
import { RetObjectYou, RetObjectDeez } from './RetObject';
import Search from './Search';
import Media from './Media';
import youtubelogo from '../assets/ytlogowhite.svg';
import deezerlogo from '../assets/deezerlogowhite.svg';

class DivTap extends Component {
  static propTypes = divTapPropTypes;

  static defaultProps = divTapDefaultProps;

  constructor() {
    super();
    this.renderThumbVert = this.renderThumbVert.bind(this);
    this.handleTapClick = this.handleTapClick.bind(this);
    this.renderThumbHor = this.renderThumbHor.bind(this);
  }

  renderThumbVert = (props) => {
    const thumbStyle = {
      backgroundColor: 'black',
    };
    return (
      <div {...props} style={{ ...thumbStyle }} className="vertical-thumb" />
    );
  }

  renderThumbHor = () => (
    <div style={{ display: 'none' }} />
  )

  handleTapClick = value => () => {
    const { onObjTap } = this.props;
    onObjTap(value);
  }

  handleObjClick = (id, mediaType, songObj) => () => {
    const { onObjClick } = this.props;
    const mediaObj = {
      MType: mediaType,
      ID: id.toString(),
      songObject: songObj,
    };
    onObjClick(mediaObj);
  }

  render() {
    const {
      apiReqState: {
        dataYou,
        dataDeez,
      },
      MediaObject: {
        MediaData: {
          ID,
        },
      },
      downloadObject,
      onDownload,
    } = this.props;
    const scrollStyleYou = {
      height: 400,
      width: 420,
    };
    const scrollStyleDeez = {
      height: 400,
      width: 440,
    };
    const MediaObjectYou = {
      MediaType: 'Youtube',
      MediaData: {
        ID,
      },
    };
    const MediaObjectDeez = {
      MediaType: 'Deezer',
      MediaData: {
        ID,
      },
    };
    return (
      <div>
        <div className="MainDivTop">
          <Search
            className="SearchBar"
            {...this.props}
          />
        </div>
        <div className="MainDivTap">
          <img
            id="ytlogowhite"
            src={youtubelogo}
            alt=""
          />
          <div className="YoutubeDiv">
            <Scrollbars
              className="divscrollbar"
              renderThumbVertical={this.renderThumbVert}
              renderThumbHorizontal={this.renderThumbHor}
              autoHide
              style={scrollStyleYou}
              thumbMinSize={50}
            >
              <RetObjectYou
                DataYou={dataYou}
                handleClick={this.handleObjClick}
              />
            </Scrollbars>
            <Media
              className="YouMedia"
              mediaObj={MediaObjectYou}
              onDownload={onDownload}
              downloadObject={downloadObject}
            />
          </div>
          <img
            id="dzlogowhite"
            src={deezerlogo}
            alt=""
          />
          <div className="DeezerDiv">
            <Scrollbars
              className="divscrollbar"
              renderThumbVertical={this.renderThumbVert}
              renderThumbHorizontal={this.renderThumbHor}
              autoHide
              style={scrollStyleDeez}
              thumbMinSize={50}
            >
              <RetObjectDeez
                DataDeez={dataDeez}
                handleClick={this.handleObjClick}
              />
            </Scrollbars>
            <Media
              className="DeezMedia"
              mediaObj={MediaObjectDeez}
              onDownload={onDownload}
              downloadObject={downloadObject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DivTap;
