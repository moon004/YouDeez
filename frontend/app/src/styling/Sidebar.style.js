import styled from 'styled-components';

const DivMenu = styled.div`
  color: ${props => (props.currentState ? '#ffffff' : '#a6a6a6')};
  &:hover {
    color: ${props => (props.currentState ? '#ffffff' : '#cccccc')};
  }
`;

export default DivMenu;
