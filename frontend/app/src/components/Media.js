import React, { Component } from 'react';
import { DPlayer, RPlayer } from './Players';
import DownloadButton from './download';

// import YouDeezLogo from '../assets/youdeez_small.svg';
import YouDeezLogo from '../assets/youdeez.svg';
import {
  mediaPropTypes,
  mediaDefaultProps,
  PlayerPropTypes,
  PlayerdefaultProps,
  defaultConfig,
} from '../props';

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

  handleClickDownload = () => {
    const {
      onDownload,
      mediaObj: {
        MediaData: {
          ID,
          songObject,
        },
      },
      downloadObject: {
        state,
      },
    } = this.props;
    const downloadObject = {
      state: 'progress',
      Id: ID,
      songObj: songObject,
    };
    if (songObject !== undefined && state === 'idle') {
      onDownload(downloadObject);
    }
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
    return (
      <div>
        <div style={{
          height: 'auto',
          width: 'auto',
          marginTop: '3em',
        }}
        >
          <DeezerOrYoutube
            mediaID={ID}
            mediaType={MediaType}
          />
        </div>
        <div>
          {DownloadButton(this, songObject, state)}
        </div>
      </div>
    );
  }
}

RPlayer.propTypes = PlayerPropTypes;
RPlayer.defaultProps = PlayerdefaultProps;
DPlayer.propTypes = PlayerPropTypes;
DPlayer.defaultProps = PlayerdefaultProps;

export default Media;
