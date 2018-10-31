import { Search } from 'styled-icons/fa-solid/Search';
import styled, { keyframes } from 'styled-components';
import '../index.css';

export const Input = styled.input`
  padding: 0.5em;
  font-family: Ubuntu;
  font-weight: 500;
  font-size: 1em;
  color: rgb(20,20,20);
  background: white;
  border: 0.1em solid gray;
  border-radius: 20px;
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
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  right: -0.2em;
  top: 0.55em;
  animation: ${blink} 0.25s ${props => (props.blink ? 'infinite' : 'linear')};
  `;

export const Div = styled.div`
  width: 100%;
  position: relative;

`;

export const List = styled.li`
  list-style-type: none;
  font-size: 0.9em;
  font-family: Ubuntu;
  padding: 0.2em 0em 0.2em 0.5em;
  border-radius: 10px;
  &:hover {
    background: #EAEAEA;
  }
`;
