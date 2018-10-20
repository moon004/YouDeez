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

  it('Should have <divTap/>', () => {
    expect(shallowDumb.find('divTap').length).toEqual(1)
  })

  it('Should have <myLibrary/>', () => {
    expect(shallowDumb.find('myLibrary').length).toEqual(1)
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
    expect(action).toBe({
      type:cnst.UPDATE_MEDIA,
      payload: {
        mediaType: 'Youtube'
      }
    });
  });
})




/*
test("mock implementation", () => {
  const mock = jest.fn(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("also mock implementation", () => {
  const mock = jest.fn().mockImplementation(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock implementation one time", () => {
  const mock = jest.fn().mockImplementationOnce(() => "bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");

  expect(mock("baz")).toBe(undefined);
  expect(mock).toHaveBeenCalledWith("baz");
});

test("mock return value", () => {
  const mock = jest.fn();
  mock.mockReturnValue("bar");

  expect(mock("foo")).toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});

test("mock promise resolution", () => {
  const mock = jest.fn();
  mock.mockResolvedValue("bar");

  expect(mock("foo")).resolves.toBe("bar");
  expect(mock).toHaveBeenCalledWith("foo");
});*/