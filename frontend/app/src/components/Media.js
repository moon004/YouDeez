import React, { Component } from 'react';
import ReactPlayer from 'react-player';
// import { download } from '../utils/DL';
import YouDeezLogo from '../assets/youdeez_small.svg';
import {
  mediaPropTypes,
  mediaDefaultProps,
  PlayerPropTypes,
  PlayerdefaultProps,
  defaultConfig,
} from '../props';


const RPlayer = ({ mediaID }) => (
  <ReactPlayer
    url={`https://www.youtube.com/watch?v=${mediaID}`}
    playing
    width="auto"
    height="17.5em"
  />
);

const DPlayer = ({ mediaID, config }) => {
  const deezFront = 'https://www.deezer.com/plugins/player?';
  let attribute = '';
  Object.keys(config).forEach((key) => {
    attribute += config[key];
  });

  return (
    <iframe
      title="dz-root"
      scrolling="no"
      frameBorder="0"
      src={
        `${deezFront}${attribute}&id=${mediaID}`
      }
      width="300px"
      height="300px"
      style={{
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};


const LogoComponent = () => (

  <img
    src={YouDeezLogo}
    alt=""
    style={{
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    }}
  />
);

const withEither = (NullComponent, YouOrDeez) => ({ ...props }) => {
  const { mediaID } = props;
  console.log('withEither', mediaID.length);
  return (
    mediaID.length > 0
      ? <YouOrDeez {...props} />
      : <NullComponent {...props} />
  );
};

const withLogic = (YouPlayer, DeezPlayer) => ({ ...props }) => {
  const { mediaType } = props;
  const config = defaultConfig;
  return (
    mediaType === 'Youtube'
      ? <YouPlayer {...props} />
      : <DeezPlayer config={config.deez} {...props} />
  );
};

const YouOrDeez = withLogic(RPlayer, DPlayer);

const DeezerOrYoutube = withEither(LogoComponent, YouOrDeez);

class Media extends Component {
  static propTypes = mediaPropTypes;

  static defaultProps = mediaDefaultProps;

  constructor() {
    super();
    this.handleClickDownload = this.handleClickDownload.bind(this);
  }

  handleClickDownload = () => (event) => {
    const {
      onDownload,
      mediaObj: {
        MediaData: {
          songObject,
        },
      },
    } = this.props;
    const ytID = 'iwyXbD1Rn7g';
    console.log('play Clicked', event.value, ytID, songObject);
    const downloadObject = {
      state: 'progress',
      ID: ytID,
      songObj: songObject,
    };
    onDownload(downloadObject);
  }

  render() {
    const {
      mediaObj: {
        MediaType,
        MediaData: {
          ID,
        },
      },
      downloadObject: {
        state,
        songObject,
      },
    } = this.props;
    console.log(state, songObject);
    return (
      <div>
        <div style={{
          height: 'auto',
          width: 'auto',
          margin: '2em',
        }}
        >
          <DeezerOrYoutube
            mediaID={ID}
            mediaType={MediaType}
          />
        </div>
        <button
          type="button"
          onClick={this.handleClickDownload(MediaType)}
        >
        Download
        </button>
      </div>
    );
  }
}

RPlayer.propTypes = PlayerPropTypes;
RPlayer.defaultProps = PlayerdefaultProps;
DPlayer.propTypes = PlayerPropTypes;
DPlayer.defaultProps = PlayerdefaultProps;

export default Media;
