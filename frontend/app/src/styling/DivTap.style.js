import styled from 'styled-components';
import '../index.css';
import { Scrollbars } from 'react-custom-scrollbars';
import ytLogo from '../assets/Youtube_logo_small.png';
import deezLogo from '../assets/deezer_logo_small.png';

export const DivT = styled.div`
  width: 100%;
  border: 0.15em solid ${props => (props.currentap === 'Youtube' ? '#ffffff' : '#282828')};
  border-radius: 0.3em;
  margin: 1.5em 0em 0em 0em;
  position: relative;
`;

export const EqDivider = styled.div`
  display:flex;
  flex-direction: row;
`;

export const Button = styled.button`
  font-size: 1em;
  background-image: url(${ytLogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 3em;
  height: 4em;
  border: none;
  flex: 1;
  opacity: ${props => (props.currentap === 'Youtube' ? 1 : 0.90)};
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 1;
  }
`;

export const ButDeez = styled(Button)`
  background-image: url(${deezLogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: ${props => (props.currentap === 'Deezer' ? 1 : 0.7)};
  &:hover {
    background: 1;
  }
`;

export const StyledScrollbar = styled(Scrollbars)`
  background: ${props => (props.currentap === 'Youtube' ? '#282828' : '#f7f7f7')};
`;
