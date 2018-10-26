import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Search from '../components/Search';
import { fetchObjStart } from '../action/search-action';
import ConnectedMainWrapper, { MainWrapper } from '../MainWrapper';

import {
  FETCH_SUCCESS,
  FETCH_ERROR,
} from '../constants/constant';

describe('<Search/>', () => {
  const jspySearchFire = jest.fn();
  const jspyAutoComp = jest.fn();
  const testState = {
    handleSubmit: jspySearchFire,
    searchState: {
      fetchState: null,
      data: {},
    },
    getAutoComp: jspyAutoComp,
  };
  const initialState = {
    whichMedia: null,
    currentMediaTap: 'YOUTUBE',
  };
  const middleware = [thunk];
  const mockStore = configureStore(middleware);
  const store = mockStore(initialState);
  let shallowDumb;
  let mountAutoComp;
  let mountStore;

  beforeEach(() => {
    shallowDumb = shallow(<Search />);
    mountAutoComp = mount(<Search {...testState} />);
    mountStore = mount(
      <Provider store={store}>
        <ConnectedMainWrapper />
      </Provider>,
    );
  });

  it('Should render properly', () => {
    expect(shallowDumb.find('input').prop('placeholder')).toEqual('Search');
  });

  it('Should work for autoComplete as well', () => {
    const expected = 'coldplay';
    const searchInput = mountAutoComp.find('input');
    mountAutoComp.update();
    searchInput.simulate('change', {
      target: { value: expected },
    });
    expect(mountAutoComp.state().value).toEqual(expected);
    expect(testState.getAutoComp).toHaveBeenCalled();
  });
  it('Should work properly', () => {
    const expected = 'goose house';
    const sInput = mountStore.find('Input');
    const sIcon = mountStore.find('searchIcon');
    sInput.simulate('change', {
      target: { value: expected },
    });
    sIcon.simulate('click');
    expect(testState.handleSubmit).toHaveBeenCalled();
    expect.assertions(1);
    fetchObjStart();
    jest.useFakeTimers();
    setTimeout(() => {
      expect(testState.searchState.data).toBeInstanceOf(Object);
    }, 1000);
    jest.runAllTimers();
  });
});
