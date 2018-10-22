import React from 'react';
import Search  from '../components/Search';
import ConnectedMainWrapper,{ MainWrapper } from '../MainWrapper';
import { shallow, mount } from 'enzyme';

describe('<Search/>', () => {
  let shallowDumb;

  beforeEach(() => {
    shallowDumb = shallow(<Search/>);
    
  })

  it('Should render properly', () => {
    expect(shallowDumb.find('input').prop('placeholder')).toEqual('Search')
  })

  it('Should work properly', () => {

  
    const jspy = jest.fn(() => '');
    const mounter = mount(<Search handleSubmit={jspy}/>);
    mounter.simulate('submit')
    expect(jspy).toHaveBeenCalled();
    expect(jspy).toBe();//expecct to return something
  })

});

