import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnMainWrapper, { MainWrapper } from '../MainWrapper';
// import * as cnst from '../constants/constant';

describe('<MainWrapper/> Render The Right Component', () => {
  let shallowDumb;

  beforeEach(() => {
    shallowDumb = shallow(<MainWrapper />);
  });


  it('Should have <Media/>', () => {
    expect(shallowDumb.find('Media').length).toEqual(1);
  });

  it('Should have <Search/>', () => {
    expect(shallowDumb.find('Search').length).toEqual(1);
  });

  it('Should have <DivTap/>', () => {
    expect(shallowDumb.find('DivTap').length).toEqual(1);
  });

  it('Should have <MyLibrary/>', () => {
    expect(shallowDumb.find('MyLibrary').length).toEqual(1);
  });

  it('Should have the Footer render', () => {
    expect(shallowDumb.find('#footer-a').length).toEqual(1);
  });
});

describe('<ConnMainWrapper/>', () => {
  let shallows;

  const initialState = {
    MediaObject: {
      MediaData: {
        ID: 'lGaneyDfyls',
      },
    },
    currentMediaTap: 'Youtube',
  };
  const middleware = [thunk];
  const mockStore = configureStore(middleware);
  const store = mockStore(initialState);

  beforeEach(() => {
    shallows = shallow(
      <ConnMainWrapper store={store} />,
    );
  });

  it('Should dispatch store state correctly', () => {
    expect(shallows.props().currentMediaTap)
      .toEqual(initialState.currentMediaTap);
    expect(shallows.props().MediaObject)
      .toEqual(initialState.MediaObject);
  });
});
