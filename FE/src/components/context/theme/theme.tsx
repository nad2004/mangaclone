// theme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5', // light background
      paper: '#ffffff',   // light paper
    },
    text: {
      primary: '#000000', // optional
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827', // tương đương Tailwind bg-gray-900
      paper: '#1f2937',   // tương đương bg-gray-800
    },
    text: {
      primary: '#ffffff', // tương đương text-white
    }
  },
  
});
