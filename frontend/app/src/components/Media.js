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
import {
  DLButtonYou,
  DLButtonDeez,
} from '../styling/Media.style';
import {
  RegexpYou,
  RegexpDeez,
} from '../utils/tools';

const LogoComponent = ({ mediaType }) => (
  <div id={mediaType === 'Youtube' ? 'mediabgDivYou' : 'mediabgDivDeez'}>
    <img
      id={mediaType === 'Youtube' ? 'mediaDivImgYou' : 'mediaDivImgDeez'}
      src={mediaType === 'Youtube' ? youtubelogo : deezerlogo}
      alt=""
    />
  </div>
);

const withEither = (NullComponent, YouPlayer, DeezPlayer) => ({ ...props }) => {
  const { mediaID, mediaType } = props;
  const config = defaultConfig;
  switch (true) {
    case (RegexpDeez(mediaID)) && mediaType === 'Deezer': // true if Deezer ID
      return <DeezPlayer config={config.deez} {...props} />;
    case (RegexpYou(mediaID) && mediaType === 'Youtube'): // true if Youtube ID
      return <YouPlayer {...props} />;
    default: // Resort to null element on start.
      return <NullComponent {...props} />;
    // default:
    //   console.log('somehow it still fall to default case, what the fuck?!');
  }
};

const DeezerOrYoutubeOrNull = withEither(LogoComponent, RPlayer, DPlayer);

class Media extends Component {
  static propTypes = mediaPropTypes;

  static defaultProps = mediaDefaultProps;

  constructor() {
    super();
    this.handleClickDownload = this.handleClickDownload.bind(this);
  }

  shouldComponentUpdate(nextprops) {
    const {
      mediaObj: {
        MediaType,
        MediaData: {
          ID,
        },
      },
    } = nextprops;
    if (MediaType === 'Youtube' && RegexpYou(ID)) {
      console.log('Update Youtube');
      return true;
    }
    if (MediaType === 'Deezer' && RegexpDeez(ID)) {
      console.log('Update Deezer');
      return true;
    }
    console.log('No Update', MediaType, RegexpYou(ID));
    return false;
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
    } = this.props;

    return (
      <div className="MediaVidDiv">
        <DeezerOrYoutubeOrNull
          mediaID={ID}
          mediaType={MediaType}
        />
        <div className="DownloadMediaDiv">
          {/* {DownloadButton(this, songObject, state)} */}
          {
            MediaType === 'Youtube'
              ? (
                <DLButtonYou
                  type="button"
                  className="DownloadButton"
                  // active={}
                >
                  Download
                </DLButtonYou>
              ) : (
                <div>
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
                  <DLButtonDeez
                    type="button"
                    className="DownloadButton"
                  >
                    Download
                  </DLButtonDeez>
                </div>
              )
          }
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
