import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Media from '../components/Media';
import LogoImage from '../assets/youdeez.svg';

describe('<Media/>', () => {
  let MountYou;
  let MountDeez;
  let MountLogo;
  const dlSpy = jest.fn();
  const testPropsYou = {
    mediaObj: {
      MediaType: 'Youtube',
      MediaData: {
        ID: 'lGaneyDfyls',
        songObject: 'Hopes and Dreams',
      },
    },
    onDownload: dlSpy,
    downloadObject: {
      state: 'idle',
      songObject: {
        songName: 'Hopes and dreams',
      },
    },
  };
  const testPropsDeez = {
    mediaObj: {
      MediaType: 'Deezer',
      MediaData: {
        ID: '125953573',
      },
    },
    downloadObject: {
      state: '',
      songObject: {
        songName: 'Hopes and dreams',
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
    downloadObject: {
      state: '',
      songObject: {
        songName: 'Hopes and dreams',
      },
    },
  };

  const base = 'https://www.deezer.com/plugins/player?';
  const attr = '&autoplay=true&playlist=false&layout=dark&size=medium&type=tracks&format=square&width=300pxheight=300px';
  const id = '&id=125953573';

  it('Should render the right component', () => {
    MountLogo = mount(<Media {...testEmptyUrl} />);
    expect(MountLogo.find('div').length).toEqual(9);
    expect(MountLogo.find('img').prop('src')).toEqual(LogoImage);
  });

  it('Should Work For Youtube', () => {
    MountYou = mount(<Media {...testPropsYou} />);
    expect(MountYou.find('ReactPlayer').prop('url'))
      .toBe('https://www.youtube.com/watch?v=lGaneyDfyls');
  });

  it('Should Work For Deezer', () => {
    MountDeez = mount(<Media {...testPropsDeez} />);
    expect(MountDeez.find('iframe').prop('src'))
      .toBe(`${base}${attr}${id}`);
  });

  it('Should work for Media Download', () => {
    // const DownloadButton = shallow(Download(<Media {...testPropsYou} />,
    //   testPropsYou.downloadObject.songObject,
    //   testPropsYou.state));
    const MountMedia = shallow(<Media {...testPropsYou} />);
    expect(MountMedia.find('#IdledownloadText').text()).toEqual('Hopes and dreams');

    const Click = MountMedia.find('#dlbuttonReal');
    Click.simulate('click');
    expect(dlSpy).toHaveBeenCalled();
  });
});
