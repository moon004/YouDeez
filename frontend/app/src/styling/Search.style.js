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
  border: ${props => (props.popList ? '0' : '0.1em')} solid gray;
  border-radius: ${props => (props.popList ? '0.6em 0.6em 0 0' : '2em')};
  width: 98.4%;
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
  right: 0.5em;
  top: 0.55em;
  /* opacity: ${props => (props.popList ? '0' : '1')}; */
  animation: ${blink} 0.25s ${props => (props.blink ? 'infinite' : 'linear')};
  `;

export const Div = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2.3em;
`;

export const List = styled.li`
  list-style-type: none;
  font-size: 0.9em;
  background: white;
  font-family: Ubuntu;
  width: 100%;
  padding: 0.2em 0em 0.2em 0.5em;
  background: ${props => (props.cursor ? '#dbdbdb' : 'white')};

  :first-child {
    border-radius: 0.5em 0.5em 0 0;
    padding-top: 1.5em;
  }
  :last-child {
    border-radius: 0 0 0.5em 0.5em;
  }
  &:hover {
    background: #dbdbdb;
  }
`;

export const Ul = styled.li`
  width: 100%;
  padding: 0;
  margin: 0;
`;
