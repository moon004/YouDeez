import styled from 'styled-components';

const Div = styled.div`

  top: 10vh;
  /* left: ${props => ((props.width) / window.screen.width) * 30}vw ; */
  width: 35em;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  /* @media screen and ( max-width: 768px ) {
    left: 15vw;
  }
  
  @media screen and ( max-width: 600px ) {
    left: 10vw;
  }

  @media screen and ( max-width: 425px ) {
    left: 1vw;
    width: auto;
  } */

`;

export default Div;
