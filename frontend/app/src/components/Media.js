import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import YouDeezLogo from '../assets/youdeez_small.svg';


const RPlayer = ({ Rurl }) => (

  <ReactPlayer
    url={Rurl}
    playing
    width="auto"
    height="auto"
  />

);

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
  const { Rurl } = props;
  return (
    Rurl.length > 0
      ? <YouOrDeez {...props} />
      : <NullComponent {...props} />
  );
};


const WithDeezerOrYoutube = withEither(LogoComponent, RPlayer);

class Media extends Component {
  constructor() {
    super();
    this.handleClickDownload = this.handleClickDownload.bind(this);
  }

  handleClickDownload = (event) => {
    console.log('play Clicked', event);
  }

  render() {
    const {
      mediaObj: {
        MediaType,
        MediaData: {
          Url,
        },
      },
    } = this.props;
    console.log('URL?', Url);
    return (
      <div>
        <div style={{
          height: 'auto',
          margin: '2em',
        }}
        >
          <WithDeezerOrYoutube
            Rurl={Url}
            mediaType={MediaType}
          />
        </div>
        <button
          type="button"
          onClick={this.handleClickDownload}
        >
        Download
        </button>
      </div>
    );
  }
}

RPlayer.propTypes = {
  Rurl: PropTypes.string,
};
Media.propTypes = {
  mediaObj: PropTypes.shape(
    {
      MediaType: PropTypes.string,
      MediaData: PropTypes.shape(
        {
          Url: PropTypes.string,
        },
      ),
    },
  ),
};

RPlayer.defaultProps = {
  Rurl: PropTypes.string,
};
Media.defaultProps = {
  Rurl: '',
  mediaObj: PropTypes.shape(
    {
      MediaType: '',
      MediaData: PropTypes.shape(
        {
          Url: PropTypes.string,
        },
      ),
    },
  ),
};

export default Media;
