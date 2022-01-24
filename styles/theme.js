import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#006064'
    },
    secondary: {
      main: '#fb8c00'
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
