import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertString, { addDot, timePassed } from '../tools/converter';
import {
  DivT,
  ButYou,
  ButDeez,
  StyledScrollbar,
  EqDivider,
  RetObjStyled,
  DivInfo,
  DivTitle,
  DivStats,
  DivImg,
  Img,
  DivDuration,
} from '../styling/DivTap.style';

class DivTap extends Component {
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

  handleObjClick = value => () => {
    const { onObjClick } = this.props;
    console.log('handleObjClick', value);
    onObjClick(value);
  }

  render() {
    const {
      searchState: {
        data,
      },
      tapState,
    } = this.props;

    // id: "lGaneyDfyls"
    // contentDetails:
    //    duration: "PT15M31S"
    // snippet:
    //    channelTitle: "Elu Tran"
    //    description: "Determination!↵↵↵↵(Doesn't have the cleanest )
    //    publishedAt: "2015-09-17T23:43:56.000Z"
    //    thumbnails: {default: {…}, medium: {…}, high: {…}}
    //    title: "Undertale OST - Hopes And Dreams (Intro) & Save The World Extended"
    // statistics:
    //    viewCount: "19684560"
    const RetObject = data.map(item => (
      <RetObjStyled
        key={item.id}
        onClick={this.handleObjClick(item.id)}
      >
        <DivInfo>
          <DivTitle>
            {addDot(item.snippet.title, 115)}
          </DivTitle>
          <DivStats>
            <a href={`https://www.youtube.com/Channel/${item.snippet.channelId}`} target="_blank" rel="noopener noreferrer">
              {addDot(item.snippet.channelTitle, 50)}
            </a>
          </DivStats>
          <DivStats>
            <div style={{ width: '10em' }}>
              {convertString(item.statistics.viewCount)}
            </div>
            <div>
              {timePassed(`${item.snippet.publishedAt.slice(0, 10)}`)}
            </div>
          </DivStats>
        </DivInfo>
        <DivImg>
          <Img
            src={item.snippet.thumbnails.medium.url}
            alt=""
          />
          <DivDuration>
            {convertString(item.contentDetails.duration)}
          </DivDuration>
        </DivImg>
      </RetObjStyled>
    ));

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
          {RetObject}
        </StyledScrollbar>

      </DivT>
    );
  }
}

DivTap.propTypes = {
  searchState: PropTypes.shape(
    {
      fetchState: PropTypes.string,
      data: PropTypes.array,
    },
  ),
  tapState: PropTypes.string,
};

DivTap.defaultProps = {
  searchState: {
    fetchState: '',
    data: '',
  },
  tapState: 'Youtube', // Default to youtube
};

export default DivTap;
