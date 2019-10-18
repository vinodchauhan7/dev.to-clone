import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600|Montserrat');

    html {
      height: 100%;
      overflow-x : hidden;
    }

    body {
       
        font-family: Montserrat, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        background: rgb(49,60,72) ;
        color : black;
        *:focus{
          outline:0;
        }
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }
    `;
