import React from 'react';
import Admin from './Admin'
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffa246"
    },
    secondary: {
      main: "#72d665"
    }
  }
});

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <ThemeProvider theme={theme}>
        <Admin />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
