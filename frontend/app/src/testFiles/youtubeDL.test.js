import fs from 'fs';
import * as ytdl from '../utils/DL';

const url = 'https://www.youtube.com/watch?v=tCL288U74l8';

describe('The constant value', () => {
  const isYouTubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  it('ytDlDetailsPath', () => {
    expect(ytdl.ytDlDetailsPath).toEqual('');
  });
  it('ytDlDetailsPath', () => {
    expect(ytdl.ytdlBin).toEqual('');
  });
  it('fs', () => {
    expect(fs.existsSync(ytdl.ytDlDetailsPath)).toBe(true);
  });
  it('isYoutubeRegex', () => {
    expect((isYouTubeRegex).test(url)).toBe(true);
  });
});


describe('The Download', () => {
  const spy = jest.fn();
  it('check args', () => {
    const args = ytdl.download(url, ['-x', '--autio-format'], spy);
    expect(spy).toHaveBeenCalled();
    expect(args).toEqual('array');
  });
});
