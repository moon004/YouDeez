import styled from 'styled-components';
import { Github } from 'styled-icons/fa-brands/Github';

/* es-lint-disable import/prefer-default-export */
export const GithubIcon = styled(Github)`
  color: #7f7f7f;
  width: 1.5em;
  height: 2em;
  margin: 0 auto;
  &:hover {
    color: white;
  }
`;
