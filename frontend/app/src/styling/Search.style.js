import { Search } from 'styled-icons/fa-solid/Search';
import styled, { keyframes } from 'styled-components';
import '../index.css';

export const Input = styled.input`
  padding: 0.5em;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 1em;
  color: rgb(20,20,20);
  box-sizing : border-box;
  background: white;
  border: ${props => (props.popList ? '0' : '0.1em')} solid gray;
  border-radius: ${props => (props.popList ? '0.6em 0.6em 0 0' : '2em')};
  width: 100%;
  &:focus {
     outline: none;
   }
`;

const blink = keyframes`
   0% {
     color: black;
   }

   50% {
     color: white;
   }

   100% {
     color: black;
   }

`;

export const SearchIcon = styled(Search)`
  /* opacity: ${props => (props.popList ? '0' : '1')}; */
  animation: ${blink} 0.25s ${props => (props.blink ? 'infinite' : 'linear')};
  `;

export const List = styled.li`
  background: ${props => (props.cursor ? '#dbdbdb' : 'white')};

`;
