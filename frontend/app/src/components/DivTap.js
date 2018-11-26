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

const withYouOrDeez = (YouComponent, DeezComponent) => ({ TapState, ...props }) => (
  TapState
    ? <YouComponent TapState={TapState} {...props} />
    : <DeezComponent TapState={TapState} {...props} />
);

const withRenderOrEmpty = (YDComponent, EmpComponent) => ({ ...props }) => {
  console.log('Render Empty or not', props.DataYou);
  return (
    props.DataYou !== undefined
      ? <YDComponent {...props} />
      : <EmpComponent {...props} />
  );
};

const RenderYouOrDeez = withYouOrDeez(RetObjectYou, RetObjectDeez);

const RenderOrEmpty = withRenderOrEmpty(RenderYouOrDeez, EmptyComponent);

class DivTap extends Component {
  static propTypes = divTapPropTypes;

  static defaultProps = divTapDefaultProps;

  constructor() {
    super();
    this.renderThumb = this.renderThumb.bind(this);
    this.handleTapClick = this.handleTapClick.bind(this);
  }

  renderThumb = (props) => {
    const thumbStyle = {
      backgroundColor: 'black',
    };
    return (
      <div {...props} style={{ ...thumbStyle }} className="vertical-thumb" />
    );
  }

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
    console.log('handleObjClick', mediaObj);
    onObjClick(mediaObj);
  }

  render() {
    const {
      searchState: {
        dataYou,
        dataDeez,
      },
      tapState,
    } = this.props;
    console.log('dataYou n dataDeez', dataYou, dataDeez);
    return (
      <DivT currentap={tapState}>
        <EqDivider>
          <ButYou
            type="button"
            onClick={this.handleTapClick('Youtube')}
            currentap={tapState}
          >
            {''}
          </ButYou>
          <ButDeez
            type="button"
            onClick={this.handleTapClick('Deezer')}
            currentap={tapState}
          >
            {''}
          </ButDeez>
        </EqDivider>
        <StyledScrollbar
          renderThumbVertical={this.renderThumb}
          autoHide
          style={{ height: 300 }}
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
