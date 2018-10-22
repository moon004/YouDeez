import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ConnectedMainWrapper,{ MainWrapper } from '../MainWrapper';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { updateMediaType, updateCurrentMedia } from '../action/media-action'
import * as cnst from '../constants/constant';
import configureStore from 'redux-mock-store'

describe('<MainWrapper/> Render The Right Component', () => {
  let shallowDumb;

  beforeEach(() => {
    shallowDumb = shallow(<MainWrapper/>);
  })


  it('Should have <Media/>', () => {
    expect(shallowDumb.find('Media').length).toEqual(1)
  })

  it('Should have <Search/>', () => {
    expect(shallowDumb.find('Search').length).toEqual(1)
  })

  it('Should have <DivTap/>', () => {
    expect(shallowDumb.find('DivTap').length).toEqual(1)
  })

  it('Should have <MyLibrary/>', () => {
    expect(shallowDumb.find('MyLibrary').length).toEqual(1)
  })

});

describe('<ConnectedMainWrapper/>', () => {
  let shallows,store ;

  const initialState = {
    whichMedia: null,
    currentMediaTap: "YOUTUBE"
  }
  const middleware = [thunk]
  const mockStore = configureStore(middleware)
  store = mockStore(initialState)

  beforeEach(() => {
    shallows = mount(
      <Provider store={store}>
        <ConnectedMainWrapper/>
      </Provider>
    )
  })

  it('Should render the connected Component', () => {
    expect(shallows
      .find(ConnectedMainWrapper)
      .length).toEqual(1)
  })
  
  it('Should show initialState', () => {
    expect(shallows.find(MainWrapper).prop('currentMediaTap'))
    .toEqual(initialState.currentMediaTap)
  })

  it('Should check action on dispatch', async () => {
    const action = updateMediaType('Youtube')
    expect(action).toEqual({
      type:cnst.UPDATE_MEDIA,
      payload: {
        mediaType: 'Youtube'
      }
    });
  });
})
