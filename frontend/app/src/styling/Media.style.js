import styled from 'styled-components';
import '../index.css';
import { ArrowAltCircleDown } from 'styled-icons/fa-regular/ArrowAltCircleDown';

export const DlButton = styled(ArrowAltCircleDown)`
  color: white;
  width: 3em;
  height: 3em;
  opacity: ${props => (props.downloadState ? '0.2' : '1')};
  padding-right: 1.5em;
  &:hover {
    opacity: ${props => (props.downloadState ? '0.2' : '0.8')};
  }
  &:active {
    opacity: 0.2;
  }
`;

export const DivDownload = styled.div`
  width: 21em;
  margin: 1.5em 0 1.5em 6em;
  color: white;
  display: flex;
  flex-direction: row;
`;

// Reminder: always put state change element here!
export const DLButtonYou = styled.button`

`;

export const DLButtonDeez = styled.button`

`;
