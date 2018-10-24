import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../components/Search';
import ConnectedMainWrapper, { MainWrapper } from '../MainWrapper';

describe('<Search/>', () => {
  let shallowDumb;

  beforeEach(() => {
    shallowDumb = shallow(<Search />);
  });

  it('Should render properly', () => {
    expect(shallowDumb.find('input').prop('placeholder')).toEqual('Search');
  });

  it('Should work properly', () => {
    const jspy = jest.fn(() => 'bar');
    const mounter = mount(<Search handleSubmit={jspy} />);
    mounter.find('button').simulate('click');
    expect(jspy).toHaveBeenCalled();
    expect(jspy('foo')).toBe('bar');
  });

  it('Should work for autoComplete as well', () => {
    const jspySearchFire = jest.fn();
    const jspyAutoComp = jest.fn();
    const testState = {
      handleSubmit: jspySearchFire,
      searchState: {
        fetchState: null,
        data: '',
      },
      getAutoComp: jspyAutoComp,
    };
    const expected = 'coldplay';
    const mountAutoComp = mount(<Search {...testState} />);
    const searchInput = mountAutoComp.find('input');
    const searchButton = mountAutoComp.find('button');
    mountAutoComp.update();
    searchInput.simulate('change', {
      target: { value: expected },
    });
    searchButton.simulate('click');
    expect(testState.handleSubmit).toHaveBeenCalled();
    expect(mountAutoComp.state().value).toEqual(expected);
    expect(testState.getAutoComp).toHaveBeenCalled();
  });
});
