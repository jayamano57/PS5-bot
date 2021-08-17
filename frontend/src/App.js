import GlobalStyle from './globalStyles';
import Home from './components/Home';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#895dc4',
    }
  },
});

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
