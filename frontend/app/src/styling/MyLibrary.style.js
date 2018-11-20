import styled from 'styled-components';
import { PlayArrow } from 'styled-icons/material/PlayArrow';
import { SkipNext } from 'styled-icons/material/SkipNext';
import { SkipPrevious } from 'styled-icons/material/SkipPrevious';
import { Repeat } from 'styled-icons/feather/Repeat';
import { Pause } from 'styled-icons/material/Pause';

import '../index.css';
import { StyledScrollbar } from './DivTap.style';

export const DivLib = styled.div`
  width: 100%;
  background: #282828;
  height: 20em;
  margin-bottom: 12em;
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
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2em;
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
  width: 1.4em;
  height: 1.4em;
  position: absolute;
  left: 25.6em;
  opacity: ${props => (props.loopOn ? '1' : '0.6')};
  &:hover {
    opacity: 1;
  }
`;

export const StyledScrollbarLib = styled(StyledScrollbar)`
  background: #282828;
`;


export const DivMediaMiddle = styled.div`
  flex-direction: column;
  display:flex;
  flex-grow: 2;
  padding-right: 1em;
`;

export const DivMediaImg = styled.div`
  display: flex;
  position: relative;
  width: 7em;
  height: 4em;
`;

export const DivDur = styled.div`
  position: absolute;
  left: 31.1em;
  top: 2.2em;
  font-weight: 200;
  font-size: 0.75em;
`;

export const DivTitle = styled.div`
  height: 2.9em;
  width: 13.9em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
