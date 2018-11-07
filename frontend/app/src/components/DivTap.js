import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertString, { addDot, timePassed } from '../utils/converter';
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
  DeezDiv,
} from '../styling/DivTap.style';

const RetObjectYou = props => (
  props.DataYou.map(item => (
    <RetObjStyled
      key={item.id}
      onClick={props.handleClick(item.id, 'Youtube')}
      tapState={props.TapState}
    >
      <DivInfo>
        <DivTitle>
          {addDot(item.snippet.title, 115)}
        </DivTitle>
        <DivStats>
          <a
            href={`https://www.youtube.com/Channel/${item.snippet.channelId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
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
  )));

const durationStyle = {
  width: '3em',
  display: 'flex',
  justifyContent: 'flex-end',
  color: '#5d5d5d',
  fontSize: '0.7em',
  fontWeight: '100',
  marginTop: '0.5em',
};

const artistAlbumStyle = {
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.8em',
  alignItems: 'center',
};

const RetObjectDeez = props => (
  props.DataDeez.map(item => (
    <RetObjStyled
      key={item.id}
      tapState={props.TapState}
    >
      <DeezDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '2.2em',
            marginTop: '-0.2em',
          }}
        >
          <div
            style={{
              width: '16em',
            }}
          >
            {addDot(item.title, 25)}
          </div>
          <div
            style={durationStyle}
          >
            {convertString(item.duration)}
          </div>
        </div>
        <div
          style={artistAlbumStyle}
        >
          <img
            src={item.artist.picture_small}
            alt=""
            style={{
              height: '3.7em',
              width: '3.7em',
              marginRight: '0.6em',
            }}
          />
          <div
            style={{
              width: '8em',
            }}
          >
            <a
              style={{
                color: '#282828',
              }}
              href={item.artist.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addDot(item.artist.name, 16)}
            </a>
          </div>
          <div
            style={{
              width: '10.4em',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <a
              style={{
                color: '#282828',
              }}
              href={`https://www.deezer.com/en/album/${item.album.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addDot(item.album.title, 13)}
            </a>
          </div>
        </div>
      </DeezDiv>
      <img src={item.album.cover} alt="" style={{ height: '6em', width: '6em' }} />
    </RetObjStyled>

  ))
);

const withYouOrDeez = (YouComponent, DeezComponent) => ({ TapState, ...props }) => (
  TapState
    ? <YouComponent TapState={TapState} {...props} />
    : <DeezComponent TapState={TapState} {...props} />
);

const RenderYouOrDeez = withYouOrDeez(RetObjectYou, RetObjectDeez);

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

  handleObjClick = (id, mediaType) => () => {
    const { onObjClick } = this.props;
    const mediaObj = {
      MType: mediaType,
      Url: `https://www.youtube.com/watch?v=${id}`,
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
          <RenderYouOrDeez
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
