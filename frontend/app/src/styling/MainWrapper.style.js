import styled from 'styled-components';

const Div = styled.div`
  margin: 5em 40em 0em 40em;
  position: relative;

  @media screen and (max-width: 1920px) {
    margin: 5em 25em 0em 25em;
    position: relative;
  }

@media screen and (max-width: 1440px) {
    margin: 5em 20em 0em 25em;
    position: relative;
  }

@media screen and (max-width: 1250px) {
    margin: 5em 10em 0em 12em;
    position: relative;
  }

  @media screen and (max-width: 768px) {
    margin: 5em 3em 0em 3em;
    position: relative;
  }
  
  @media screen and (max-width: 400px) {
    margin: 5em 2em 0em 1em;
    position: relative;
  }
`;

export default Div;
