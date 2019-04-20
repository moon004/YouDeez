import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { divTapPropTypes, divTapDefaultProps } from '../props';
import { RetObjectYou, RetObjectDeez } from './RetObject';
import {
  DivT,
} from '../styling/DivTap.style';

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
    return (
      <DivT>
        <Scrollbars
          className="divscrollbar"
          renderThumbVertical={this.renderThumbVert}
          renderThumbHorizontal={this.renderThumbHor}
          autoHide
          style={{
            height: 400,
          }}
          thumbMinSize={50}
        >
          <RetObjectYou
            DataYou={dataYou}
            handleClick={this.handleObjClick}
          />
          <RetObjectDeez
            DataDeez={dataDeez}
            handleClick={this.handleObjClick}
          />
        </Scrollbars>
      </DivT>
    );
  }
}

export default DivTap;
