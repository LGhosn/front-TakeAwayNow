import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
  },
});

export default function AddButton( {onClick} : any) {
  return (
    <ThemeProvider theme={theme}>
      <Fab color="primary" onClick={onClick} aria-label="add">
        <AddIcon/>
      </Fab>
    </ThemeProvider>
  );
}
