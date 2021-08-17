import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
html, body, #root {
    height: 100%
  }

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
      font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
`;
 
export default GlobalStyle;