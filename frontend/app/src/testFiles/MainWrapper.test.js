import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnMainWrapper, { MainWrapper } from '../MainWrapper';
// import * as cnst from '../constants/constant';

// describe('<MainWrapper/> Render The Right Component', () => {
//   let shallowDumb;

//   const initialState = {
//     MediaObject: {
//       MediaType: '',
//       MediaData: {
//         ID: 'lGaneyDfyls',
//       },
//     },
//     currentMediaTap: 'Youtube',
//     currentState: '',
//     autoComplete: {
//       currentState: 'Youtube',
//       autoCompData: [],
//     },
//     apiReqState: {
//       fetchState: 'Search',
//       data: [],
//     },
//   };

//   beforeEach(() => {
//     shallowDumb = shallow(<MainWrapper />);
//   });


//   it('Should have <Media/>', () => {
//     expect(shallowDumb.find('Media').length).toEqual(1);
//   });

//   it('Should have <Search/>', () => {
//     expect(shallowDumb.find('Search').length).toEqual(1);
//   });

//   it('Should have <DivTap/>', () => {
//     expect(shallowDumb.find('DivTap').length).toEqual(1);
//   });

//   it('Should have <MyLibrary/>', () => {
//     expect(shallowDumb.find('MyLibrary').length).toEqual(1);
//   });

//   it('Should have the Footer render', () => {
//     expect(shallowDumb.find('#footer-a').length).toEqual(1);
//   });
// });

describe('<ConnMainWrapper/>', () => {
  let shallows;

  const initialState = {
    MediaObject: {
      MediaType: '',
      MediaData: {
        ID: 'lGaneyDfyls',
      },
    },
    currentMediaTap: 'Youtube',
    currentState: '',
    autoComplete: {
      currentState: 'Youtube',
      autoCompData: [],
    },
    apiReqState: {
      fetchState: 'Search',
      data: [],
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    shallows = shallow(
      <ConnMainWrapper store={store} />,

    );
  });

  it('Should dispatch store state correctly', () => {
    expect(shallows.props().currentMediaTap)
      .toEqual(initialState.currentMediaTap);
    expect(shallows.props().MediaObject.MediaData.ID)
      .toEqual(initialState.MediaObject.MediaData.ID);
  });
});
