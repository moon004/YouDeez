import { Search } from 'styled-icons/fa-solid/Search';
import styled from 'styled-components';

export const Input = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu:400,500,500i');
  padding: 0.5em;
  font-family: Ubuntu;
  font-weight: 300;
  font-size: 1em;
  color: rgb(20,20,20);
  background: white;
  border: 0.1em solid gray;
  border-radius: 10px;
  width: 100%;
  &:focus {
     outline: none
   }
`;

export const SearchIcon = styled(Search)`
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  right: -0.2em;
  top: 0.55em;
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
