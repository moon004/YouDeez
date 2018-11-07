import styled from 'styled-components';
import '../index.css';
import { Scrollbars } from 'react-custom-scrollbars';
import ytLogo from '../assets/youtubeLogo.svg';
import deezLogo from '../assets/deezer_logo_small.svg';

export const DivT = styled.div`
  width: 100%;
  border: 0.15em solid ${props => (props.currentap === 'Youtube' ? '#ffffff' : '#000000')};
  border-radius: 0.3em;
  margin: 1.5em 0em 0em 0em;
  position: relative;
`;

export const EqDivider = styled.div`
  display:flex;
  flex-direction: row;
`;

export const ButYou = styled.button`
  font-size: 1em;
  background-image: ;
  background: #282828 url(${ytLogo});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 3em;
  height: 5em;
  border: none;
  flex: 1;
  opacity: ${props => (props.currentap === 'Youtube' ? 1 : 0.80)};
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }
`;

export const ButDeez = styled(ButYou)`
  background: #f7f7f7 url(${deezLogo});
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: ${props => (props.currentap === 'Deezer' ? 1 : 0.9)};
  &:hover {
    background: 1;
  }
`;

export const StyledScrollbar = styled(Scrollbars)`
  :last-child {
    padding-bottom: 1em;
  }
  background: ${props => (props.currentap === 'Youtube' ? '#282828' : '#f7f7f7')};
`;

export const RetObjStyled = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin: 0.8em 0.8em 0.8em 0.8em;
  padding: 0.5em 0.5em 0 0.5em;
  border: 0.1em solid #f3f3f3;
  &:active {
    background-color: rgba(255,255,255, 0.2);
  }
`;


/* parents of DivState DivTitle */
export const DivInfo = styled.div`
  font-weight: 600;
  flex-direction: column;
  margin-right: 0.5em;
  padding-bottom: 0.2em;
`;

export const DivTitle = styled.div`
  height: 3.9em;
  width: 20em;
  color: #f0f0f0;
`;

export const DivStats = styled(DivInfo)`
  font-size: 0.8em;
  display: flex;
  font-weight: 450;
  flex-direction: row;
  margin: 0.2em 0 0 0;
  color: #d5d5d5;
`;

export const DivImg = styled.div`
  position: relative;
  width: 300;
  height: 100%;
`;

export const DivDuration = styled.div`
  background-color: rgba(0,0,0, 0.6);
  padding: 0 0.3em 0.2em 0.2em;
  color: white;
  top: 0.4em;
  position: absolute;
  opacity: 1;
`;

export const Img = styled.img`
  max-width: 100%;
  height: auto;
`;
