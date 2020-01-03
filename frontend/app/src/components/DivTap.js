import React, { Component } from 'react';
import { divTapPropTypes, divTapDefaultProps } from '../props';
import { RetObjectYou, RetObjectDeez, EmptyComponent } from './RetObject';
import {
  DivT,
  ButYou,
  ButDeez,
  StyledScrollbar,
  EqDivider,
} from '../styling/DivTap.style';
import { DEEZER, YOUTUBE } from '../constants/constant';

const withYouOrDeez = (YouComponent, DeezComponent) => ({ TapState, ...props }) => (
  TapState
    ? <YouComponent TapState={TapState} {...props} />
    : <DeezComponent TapState={TapState} {...props} />
);

const withRenderOrEmpty = (YDComponent, EmpComponent) => ({ ...props }) => (
  props.DataYou !== undefined
    ? <YDComponent {...props} />
    : <EmpComponent {...props} />
);

const RenderYouOrDeez = withYouOrDeez(RetObjectYou, RetObjectDeez);

const RenderOrEmpty = withRenderOrEmpty(RenderYouOrDeez, EmptyComponent);

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
  };

  renderThumbHor = () => (
    <div style={{ display: 'none' }} />
  );

  handleTapClick = value => () => {
    const { onObjTap } = this.props;
    onObjTap(value);
  };

  handleObjClick = (id, mediaType, songObj) => () => {
    const { onObjClick } = this.props;
    const mediaObj = {
      MType: mediaType,
      ID: id.toString(),
      songObject: songObj,
    };
    onObjClick(mediaObj);
  };

  getDivHeight = (dataYou, dataDeez, tapState) => {
    if (dataYou === undefined && tapState === YOUTUBE) {
      return 0;
    }

    if (dataDeez === undefined && tapState === DEEZER) {
      return 0;
    }

    return 400;
  };

  render() {
    const {
      searchState: {
        dataYou,
        dataDeez,
      },
      tapState,
    } = this.props;
    const divheight = this.getDivHeight(dataYou, dataDeez, tapState);
    return (
      <DivT currentap={tapState}>
        <EqDivider>
          <ButYou
            type="button"
            onClick={this.handleTapClick(YOUTUBE)}
            currentap={tapState}
          >
            {''}
          </ButYou>
          <ButDeez
            type="button"
            onClick={this.handleTapClick(DEEZER)}
            currentap={tapState}
          >
            {''}
          </ButDeez>
        </EqDivider>
        <StyledScrollbar
          className="divscrollbar"
          renderThumbVertical={this.renderThumbVert}
          renderThumbHorizontal={this.renderThumbHor}
          autoHide
          style={{
            height: divheight,
          }}
          thumbMinSize={50}
          currentap={tapState}
        >
          <RenderOrEmpty
            TapState={tapState === 'Youtube'}
            DataYou={dataYou}
            DataDeez={dataDeez}
            handleClick={this.handleObjClick}
          />
        </StyledScrollbar>
      </DivT>
    );
  }
}

export default DivTap;
