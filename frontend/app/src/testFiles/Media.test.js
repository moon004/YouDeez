import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Media from '../components/Media';
import LogoImage from '../assets/youdeez_small.svg';

describe('<Media/>', () => {
  let MountYou;
  let MountDeez;
  let MountLogo;
  const spy = jest.fn();
  const dlSpy = jest.fn();
  const testPropsYou = {
    mediaObj: {
      MediaType: 'Youtube',
      MediaData: {
        ID: 'lGaneyDfyls',
      },
    },
    onDownload: spy,
    downloadObject: dlSpy,
  };
  const testPropsDeez = {
    mediaObj: {
      MediaType: 'Deezer',
      MediaData: {
        ID: '125953573',
      },
    },
  };
  const testEmptyUrl = {
    mediaObj: {
      MediaType: '',
      MediaData: {
        ID: '',
      },
    },
  };

  const base = 'https://www.deezer.com/plugins/player?';
  const attr = '&autoplay=true&playlist=false&layout=dark&size=medium&type=tracks&format=square&width=300pxheight=300px';
  const id = '&id=125953573';
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
    expect(MountDeez.find('iframe').prop('src'))
      .toBe(`${base}${attr}${id}`);
  });

  it('Should work for Media Download', () => {
    const Click = MountYou.find('button');
    Click.simulate('click');
    expect(testPropsYou.onDownload).toHaveBeenCalled();
    expect(testPropsYou.downloadObject).toHaveBeenCalled();
  });
});
