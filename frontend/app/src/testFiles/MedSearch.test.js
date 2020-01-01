import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import Search from '../components/Search';
import { SearchReducer, SACReducer } from '../reducers/search-reducer';


describe('<Search/>', () => {
  const jspySearchFire = jest.fn();
  const jspyAutoComp = jest.fn();
  const testState = {
    handleSubmit: jspySearchFire,
    searchState: {
      fetchState: 'Search',
      data: [],
    },
    onGetAutoComp: jspyAutoComp,
  };
  const allReducers = combineReducers({
    apiReqState: SearchReducer,
    autoComplete: SACReducer, // SAC is Search Auto Complete
  });
  const store = createStore(allReducers, applyMiddleware(thunk));

  let mountAutoComp;
  let mountStore;

  beforeEach(() => {
    mountAutoComp = mount(<Search {...testState} />);
    mountStore = mount(
      <Provider store={store}>
        <Search {...testState} />
      </Provider>,
    );
  });

  it('Should work for autoComplete as well', () => {
    const expected = 'coldplay';
    const searchInput = mountAutoComp.find('input');
    mountAutoComp.update();
    expect(searchInput.length).toEqual(1);
    searchInput.simulate('change', {
      target: { value: expected },
    });
    expect(mountAutoComp.state().value).toEqual(expected);
    searchInput.simulate('change', {
      target: { value: ' ' },
    });
    expect.assertions(3);
    setTimeout(() => {
      expect(testState.onGetAutoComp).toHaveBeenCalled();
    }, 500);
    expect(testState.searchState.fetchState).toEqual('Search');
  });

  it('Should work properly', () => {
    const expected = 'goose house';
    const sInput = mountStore.find('input');
    const sIcon = mountStore.find('svg');
    sInput.simulate('change', {
      target: { value: expected },
    });
    sIcon.simulate('click');
    expect(testState.handleSubmit).toHaveBeenCalled();
  });
});
