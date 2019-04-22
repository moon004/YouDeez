import React from 'react';
import DivTap from './DivTap';
import MyLibrary from './MyLibrary';
import { convertString, addDot, timePassed } from '../utils/tools';
import {
  DivInfo,
  DivTitle,
  DivStats,
  DivImg,
  Img,
  DivDuration,
  RetObjStyled,
  DeezDiv,
} from '../styling/DivTap.style';

const SearchLibHOC = (SearchCmp, LibCmp) => ({ currentState, ...props }) => (
  currentState
    ? <SearchCmp {...props} />
    : <LibCmp {...props} />
);


export const RenderSearchOrLib = SearchLibHOC(DivTap, MyLibrary);

export const RetObjectYou = (props) => {
  const { DataYou } = props;
  if (typeof DataYou !== 'undefined') {
    return (
      props.DataYou.map((item) => {
        const songObject = {
          songName: item.snippet.title,
          songImg: item.snippet.thumbnails.medium.url,
          songDur: item.contentDetails.duration,
          songArtist: item.snippet.channelTitle,
          songAlbum: null,
        };
        return (
          <RetObjStyled
            className="RetObjStyled"
            key={item.id}
            onClick={props.handleClick(item.id, 'Youtube', songObject)}
            tapState="Youtube"
          >
            <DivInfo>
              <DivTitle>
                {addDot(item.snippet.title, 115)}
              </DivTitle>
              <DivStats>
                <a
                  href={`https://www.youtube.com/Channel/${item.snippet.channelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {addDot(item.snippet.channelTitle, 50)}
                </a>
              </DivStats>
              <DivStats>
                <div style={{ width: '10em' }}>
                  {`${convertString(item.statistics.viewCount)} views`}
                </div>
                <div>
                  {timePassed(`${item.snippet.publishedAt.slice(0, 10)}`)}
                </div>
              </DivStats>
            </DivInfo>
            <DivImg>
              <Img
                src={item.snippet.thumbnails.medium.url}
                alt=""
              />
              <DivDuration>
                {convertString(item.contentDetails.duration)}
              </DivDuration>
            </DivImg>
          </RetObjStyled>
        );
      }));
  }
  return (
    <div>
      {'No such thing on youtube server'}
    </div>
  );
};

const durationStyle = {
  width: '3em',
  display: 'flex',
  justifyContent: 'flex-end',
  fontWeight: '100',
  marginTop: '0.5em',
};

const artistAlbumStyle = {
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.8em',
  alignItems: 'center',
};

export const RetObjectDeez = (props) => {
  const { DataDeez } = props;
  if (typeof DataDeez !== 'undefined') {
    return (
      props.DataDeez.map((item) => {
        const songObject = {
          songName: item.title,
          songImg: item.album.cover,
          songDur: item.duration,
          songArtist: item.artist.name,
          songAlbum: item.album.title,
        };
        return (
          <RetObjStyled
            className="RetObjStyled"
            key={item.id}
            onClick={props.handleClick(item.id, 'Deezer', songObject)}
            tapState={props.TapState}
          >
            <DeezDiv>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '2.2em',
                  marginTop: '-0.2em',
                }}
              >
                <div
                  className="deezerTitle"
                >
                  {addDot(item.title, 25)}
                </div>
                <div
                  style={durationStyle}
                  className="deezerDuration"
                >
                  {convertString(item.duration)}
                </div>
              </div>
              <div
                style={artistAlbumStyle}
                className="deezerAlbumDiv"
              >
                <img
                  src={item.artist.picture_small}
                  alt=""
                  style={{
                    height: '3.7em',
                    width: '3.7em',
                    marginRight: '0.6em',
                  }}
                />
                <div
                  style={{
                    width: '8em',
                  }}
                >
                  <a
                    href={item.artist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {addDot(item.artist.name, 16)}
                  </a>
                </div>
                <div
                  style={{
                    width: '10.4em',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <a
                    href={`https://www.deezer.com/en/album/${item.album.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {addDot(item.album.title, 13)}
                  </a>
                </div>
              </div>
            </DeezDiv>
            <img src={item.album.cover} alt="" style={{ height: '6em', width: '6em' }} />
          </RetObjStyled>
        );
      })
    );
  }
  return (
    <div>
      {'No such thing on deezer server'}
    </div>
  );
};
