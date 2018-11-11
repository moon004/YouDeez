import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Media from '../components/Media';
import LogoImage from '../assets/youdeez_small.svg';

describe('<Media/>', () => {
  let MountYou;
  let MountDeez;
  let MountLogo;

  const testPropsYou = {
    mediaObj: {
      MediaType: 'Youtube',
      MediaData: {
        Url: 'https://www.youtube.com/watch?v=lGaneyDfyls',
      },
    },
  };
  const testPropsDeez = {
    mediaObj: {
      MediaType: 'Deezer',
      MediaData: {
        Url: 'https://www.deezer.com/track/125953573',
      },
    },
  };
  const testEmptyUrl = {
    mediaObj: {
      MediaType: '',
      MediaData: {
        Url: '',
      },
    },
  };

  beforeEach(() => {
    MountLogo = mount(<Media {...testEmptyUrl} />);
    MountYou = mount(<Media {...testPropsYou} />);
    MountDeez = mount(<Media {...testPropsDeez} />);
  });

  it('Should render the right component', () => {
    expect(MountLogo.find('div').length).toEqual(2);
    expect(MountLogo.find('button').length).toEqual(1);
    expect(MountLogo.find('img').prop('src')).toEqual(LogoImage);
  });

  it('Should Work For Youtube', () => {
    expect(MountYou.find('ReactPlayer').prop('url'))
      .toBe('https://www.youtube.com/watch?v=lGaneyDfyls');
  });

  it('Should Work For Deezer', () => {
    expect(MountDeez.find('ReactPlayer').prop('url'))
      .toBe('https://www.deezer.com/track/125953573');
  });
});
