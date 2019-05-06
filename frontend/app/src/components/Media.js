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
  RegexpUserToken,
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
    this.state = {
      UsrToken: '',
      activate: false,
    };
  }

  shouldComponentUpdate(nextprops, nextstate) {
    const {
      mediaObj: {
        MediaType,
        MediaData: {
          ID,
        },
      },
    } = nextprops;
    if (MediaType === 'Youtube' && RegexpYou(ID)) {
      return true;
    }
    if (MediaType === 'Deezer' && RegexpDeez(ID)) {
      return true;
    }
    if (nextstate.UsrToken !== this.state.UsrToken) {
      return true;
    }
    return false;
  }

  handleClickDownload = active => () => {
    const {
      onDownload,
      mediaObj: {
        MediaData: {
          ID,
          songObject,
        },
      },
    } = this.props;
    const { UsrToken } = this.state;
    const downloadObject = {
      state: 'progress',
      Id: ID,
      songObj: songObject,
      UserToken: UsrToken,
    };
    if (songObject !== undefined && active) {
      onDownload(downloadObject);
    }
  }

  handleChange = (event) => {
    this.setState({
      UsrToken: event.target.value,
      activate: false,
    });
    console.log('Event', event.target.value);
    if (RegexpUserToken(event.target.value)) {
      console.log('RegexpUserToken', this.state.activate);
      this.setState({
        activate: true,
      });
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
      },
    } = this.props;
    const { UsrToken, activate } = this.state;
    const deezActivate = RegexpDeez(ID) && activate && state === 'idle';
    const youActivate = RegexpYou(ID) && state === 'idle';
    return (
      <div className="MediaVidDiv">
        <DeezerOrYoutubeOrNull
          mediaID={ID}
          mediaType={MediaType}
        />
        <div className="DownloadMediaDiv">
          {
            MediaType === 'Youtube'
              ? (
                <DLButtonYou
                  type="button"
                  className="DownloadButton"
                  active={youActivate}
                  onClick={this.handleClickDownload(RegexpYou(ID))}
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
                      type="text"
                      value={UsrToken}
                      onChange={this.handleChange}
                    />
                  </div>
                  <DLButtonDeez
                    type="button"
                    className="DownloadButton"
                    active={deezActivate}
                    onClick={this.handleClickDownload(deezActivate)}
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
