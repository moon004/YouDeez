import React, { Component } from 'react';
import { DPlayer, RPlayer } from './Players';
// import DownloadButton from './download';

import youtubelogo from '../assets/youtubeLogo.svg';
import deezerlogo from '../assets/deezerlogo.svg';
import {
  mediaPropTypes,
  mediaDefaultProps,
  PlayerPropTypes,
  PlayerdefaultProps,
  defaultConfig,
} from '../props';

const LogoComponent = ({ mediaType }) => (
  <div id={mediaType === 'Youtube' ? 'mediabgDivYou' : 'mediabgDivDeez'}>
    <img
      id={mediaType === 'Youtube' ? 'mediaDivImgYou' : 'mediaDivImgDeez'}
      src={mediaType === 'Youtube' ? youtubelogo : deezerlogo}
      alt=""
    />
  </div>
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
      // downloadObject: {
      //   state,
      //   songObject,
      // },
    } = this.props;
    return (
      <div className="MediaVidDiv">
        <DeezerOrYoutube
          mediaID={ID}
          mediaType={MediaType}
        />
        <div className="DownloadMediaDiv">
          {/* {DownloadButton(this, songObject, state)} */}
          {
            MediaType === 'Youtube'
              ? (
                <div />
              ) : (
                <div className="DownloadInfo">
                  <a
                    id="UTQuestion"
                    href="https://notabug.org/RemixDevs/DeezloaderRemix/wiki/Login+via+userToken"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ?
                  </a>
                  <div id="UTText">User Token</div>
                  <input
                    id="UserToken"
                  />
                </div>
              )
          }
          <button type="button" className="DownloadButton">
            Download
          </button>
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
