import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';
import { SkipNext } from 'styled-icons/material/SkipNext';
import { SkipPrevious } from 'styled-icons/material/SkipPrevious';
import { Repeat } from 'styled-icons/feather/Repeat';
import { Shuffle } from 'styled-icons/feather/Shuffle';
import { Pause } from 'styled-icons/material/Pause';
import { TrashAlt } from 'styled-icons/fa-solid/TrashAlt';
import { Scrollbars } from 'react-custom-scrollbars';
import '../index.css';

export const DivLib = styled.div`
  width: 100%;
  background: none;
  height: 20em;
  margin-bottom: 21em;
  position: relative;
  color: white;
`;

export const DivObj = styled.div`
  opacity: ${props => (props.PLAddSong ? 1 : 0.6)};
  background: ${props => (props.playingThis ? '#c1c1c1' : 'none')};
  color: ${props => (props.playingThis ? 'black' : 'white')};
  font-size: ${props => (props.playingThis ? '1.15em' : '1.1em')};
  font-weight: ${props => (props.playingThis ? '600' : '400')};
  &:hover {
    background: ${props => (props.playingThis ? '#919191' : '3b3b3b')};;
  }
`;

export const PLbutton = styled.div`
  border: ${props => (props.selected ? '2.5px outset white' : '1px outset #a5a5a5')};
  opacity: ${props => (props.hidePLBut ? 0 : 1)};
  &:hover {
    border: ${props => (props.selected
    ? '2.5px outset white' : '2px outset white')};
  }
`;

export const PLbuttonDiv = styled.div`
  & .playlistName:nth-child(2) {
      border: ${props => (props.selected
    ? '3px outset white' : '1px outset #a5a5a5')};
    background: ${props => (props.selected
    ? 'rgb(35, 35, 35)' : 'rgb(22, 22, 22)')};
    &:hover {
    border: ${props => (props.selected
    ? '3px outset white' : '2px outset white')};
  }
    }
`;

export const DivObjTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 25em;
`;

export const DivObjArtist = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
  padding-top: 0.4em;
  min-width: 0;
  opacity: 0.7;
`;

export const DivSongDur = styled.div`
  font-weight: ${props => (props.playingThis ? '600' : '200')};
  font-size: 0.8em;
  letter-spacing: 0.1em;
  margin-top: 0.1em;
  display: flex;
  flex-direction: column;
`;

export const Div = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

// ---------- Mediaplayer Style --------------//
export const DivMediaPlayer = styled.div`
  width: 100%;
  height: 6em;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const sizePlay = '5.1em';
const sizePrevNext = '4em';
const colorWhite = '#eeeeee';


export const PlayIcon = styled(PlayArrow)`
  color: ${colorWhite};
  width: ${sizePlay};
  height: ${sizePlay};
  margin: -1.5em;
  `;
export const PauseIcon = styled(Pause)`
  color: ${colorWhite};
  width: ${sizePlay};
  height: ${sizePlay};
  margin: -1.5em;
  `;

export const NextIcon = styled(SkipNext)`
  color: ${colorWhite};
  width: ${sizePrevNext};
  height: ${sizePrevNext};
`;

export const PrevIcon = styled(SkipPrevious)`
  color: ${colorWhite};
  width: ${sizePrevNext};
  height: ${sizePrevNext};
  margin-left: -0.7em;
`;

export const RepeatIcon = styled(Repeat)`
  color: white;
  width: 1.3em;
  height: 1.3em;
  position: absolute;
  top: 1.7em;
  left: 9.8em;
  opacity: ${props => (props.loopOn ? '1' : '0.6')};
  &:hover {
    opacity: 1;
  }
`;

export const ShuffleIcon = styled(Shuffle)`
  opacity: ${props => (props.ShuffleOn ? '1' : '0.6')};
`;

export const DeleteIcon = styled(TrashAlt)`
  color: white;
  opacity: 0.6;
  width: 1.5em;
  height: 1.5em;
  margin: 0.4em auto 0 auto;
  &:hover {
    opacity: 1;
  }
`;

export const StyledScrollbarLib = styled(Scrollbars)`
  background: none;
`;

export const DivMediaMiddle = styled.div`
  flex-direction: column;
  width: 19em;
  display:flex;
  flex-grow: 2;
`;

export const DivMediaImg = styled.div`
  display: flex;
  position: relative;

`;

export const DivDur = styled.div`
  position: absolute;
  left: 23em;
  top: 1.8em;
  opacity: 0.6;
  font-weight: 100;
  font-size: 1em;
`;

export const DivTitle = styled.div`
  height: 1.9em;
  width: 17.7em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
