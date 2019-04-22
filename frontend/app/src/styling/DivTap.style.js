import styled from 'styled-components';
import '../index.css';
// import ytLogo from '../assets/youtubeLogo.svg';
// import deezLogo from '../assets/deezer_logo_small.svg';

export const EqDivider = styled.div`
  display:flex;
  flex-direction: row;
`;

export const RetObjStyled = styled.li`
  font-family: ${props => (props.tapState ? 'Ubuntu' : 'Helvetica')};
  margin: ${props => (props.tapState
    ? '0.8em' : '2em 2.5em 2em 2.5em')};
  padding: ${props => (props.tapState
    ? '0.5em 0.5em 0 0.5em' : '0.5em')};
  justify-content: space-between;
`;

export const DeezDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
  font-weight: 600;
  a:hover {
    border-bottom: 0.06em solid black;
  }
`;

/* parents of DivState DivTitle */
export const DivInfo = styled.div`
  font-weight: 400;
  flex-direction: column;
  margin-right: 0.5em;
`;

export const DivTitle = styled.div`
  height: 3.9em;
  width: 20em;
  color: #f0f0f0;
`;

export const DivStats = styled(DivInfo)`
  font-size: 0.8em;
  display: flex;
  font-weight: 400;
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
  padding: 0.3em 0.4em 0.3em 0.3em;
  font-size: 0.9em;

  color: white;
  top: 0.6em;
  position: absolute;
  opacity: 1;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
