import styled from 'styled-components';
import '../index.css';
import { StyledScrollbar } from './DivTap.style';

export const DivLib = styled.div`
  width: 100%;
  background: #282828;
  height: 20em;
  margin-bottom: 5em;
  position: relative;
`;

export const DivObj = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledScrollbarLib = styled(StyledScrollbar)`
  background: #282828;
`;
