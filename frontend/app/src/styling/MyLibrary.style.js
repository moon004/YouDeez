import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';
import { SkipNext } from 'styled-icons/material/SkipNext';
import { SkipPrevious } from 'styled-icons/material/SkipPrevious';
import { Repeat } from 'styled-icons/feather/Repeat';
import { Shuffle } from 'styled-icons/material/Shuffle';
import { Pause } from 'styled-icons/material/Pause';
import { TrashAlt } from 'styled-icons/fa-solid/TrashAlt';


import '../index.css';
import { StyledScrollbar } from './DivTap.style';

export const DivLib = styled.div`
  width: 100%;
  background: none;
  height: 20em;
  margin-bottom: 9em;
  position: relative;
  color: white;
`;

export const DivObj = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 1.1em;
  padding: 0.3em 0 0.3em 0;
  justify-content: space-between;
  &:hover {
    background: #3b3b3b;
  }
  &:active {
    background: #515151;
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
  opacity: 0.7;
`;


export const DivMediaPlayer = styled.div`
  width: 100%;
  height: 10em;
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

export const StyledScrollbarLib = styled(StyledScrollbar)`
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
  opacity: 0.7;
  font-weight: 200;
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
