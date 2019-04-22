import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { divTapPropTypes, divTapDefaultProps } from '../props';
import { RetObjectYou, RetObjectDeez } from './RetObject';

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
      searchState: {
        dataYou,
        dataDeez,
      },
    } = this.props;
    const scrollStyle = {
      height: 400,
    };
    return (
      <div className="MainDivTap">
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
    );
  }
}

export default DivTap;
