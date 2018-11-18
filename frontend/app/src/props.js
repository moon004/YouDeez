import Proptypes from 'prop-types';

const {
  string, shape, func, array, any,
} = Proptypes;

export const propTypes = {
  MediaObject: shape({
    title: string,
    MediaType: string,
    MediaData: shape({
      Url: string,
    }),
  }),
  currentMediaTap: string,
  apiReqState: shape({
    fetchState: string,
    data: array,
  }),
  autoComplete: shape({
    currentState: string,
    autoCompData: array,
  }),
  onUpdateMediaObj: func,
  onUpdateCurrentMedia: func,
  SubmitSearch: func,
  onGetAutoComp: func,
};

export const defaultProps = {
  MediaObject: shape({
    MediaType: '',
    MediaData: {
      Url: '',
    },
  }),
  currentMediaTap: '',
  apiReqState: shape({
    fetchState: 'Search',
    data: [],
  }),
  autoComplete: shape({
    currentState: 'Youtube',
    autoCompData: [],
  }),
  onUpdateMediaObj: () => {},
  onUpdateCurrentMedia: () => {},
  onSubmitSearch: () => {},
  onGetAutoComp: () => {},
};

export const divTapPropTypes = {
  searchState: shape({
    fetchState: string,
    data: array,
  }),
  tapState: string,
};

export const divTapDefaultProps = {
  searchState: {
    fetchState: '',
    data: [],
  },
  tapState: 'Youtube', // Default to Youtube
};

export const mediaPropTypes = {

  mediaObj: shape({
    MediaType: string,
    MediaData: shape({
      Url: string,
    }),
  }),
};

export const mediaDefaultProps = {
  mediaObj: shape({
    MediaType: '',
    MediaData: shape({
      Url: string,
    }),
  }),
};

export const PlayerPropTypes = {
  mediaID: string,
};

export const PlayerdefaultProps = {
  mediaID: '',
};

export const libObj = {
  songTitle: string,
  img: string,
  dur: string,
  bit: any,
};

export const libObjDefault = {
  songTitle: '',
  img: '',
  dur: '',
  bit: '',
};

export const defaultConfig = {
  deez: {
    autoplay: '&autoplay=true',
    playlist: '&playlist=false',
    layout: '&layout=dark',
    size: '&size=medium',
    type: '&type=tracks',
    format: '&format=square',
    width: '&width=300px',
    height: 'height=300px',
  },
};

export const searchPropTypes = {
  searchState: shape(
    {
      fetchState: string,
      data: array,
    },
  ),
  autoComplete: shape(
    {
      currentState: string,
      autoCompData: array,
    },
  ),
  handleSubmit: func,
  onGetAutoComp: func,
};

export const searchDefaultProps = {
  searchState: {
    fetchState: 'Search', // Initial state will take value from reducer initialState
    data: [],
  },
  autoComplete: {
    currentState: '',
    autoCompData: [],
  },
  handleSubmit: () => {},
  onGetAutoComp: () => {},
};

export const myLibPropTypes = {
  dbItem: any,
};

export const myLibDefaultProps = {
  dbItem: {},
};
