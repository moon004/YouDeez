import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { divTapPropTypes, divTapDefaultProps } from '../props';
import { RetObjectYou, RetObjectDeez } from './RetObject';
import Search from './Search';
import Media from './Media';

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
      MediaObject,
      downloadObject,
      onDownload,
    } = this.props;
    const scrollStyle = {
      height: 400,
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
          <div className="YoutubeDiv">
            <Scrollbars
              className="divscrollbar"
              renderThumbVertical={this.renderThumbVert}
              renderThumbHorizontal={this.renderThumbHor}
              autoHide
              style={scrollStyle}
              thumbMinSize={50}
            >
              <RetObjectYou
                DataYou={dataYou}
                handleClick={this.handleObjClick}
              />
            </Scrollbars>
            <Media
              className="YouMedia"
              mediaObj={MediaObject}
              onDownload={onDownload}
              downloadObject={downloadObject}
            />
          </div>
          <div className="DeezerDiv">
            <Scrollbars
              className="divscrollbar"
              renderThumbVertical={this.renderThumbVert}
              renderThumbHorizontal={this.renderThumbHor}
              autoHide
              style={scrollStyle}
              thumbMinSize={50}
            >
              <RetObjectDeez
                DataDeez={dataDeez}
                handleClick={this.handleObjClick}
              />
            </Scrollbars>
          </div>
        </div>
      </div>
    );
  }
}

export default DivTap;
