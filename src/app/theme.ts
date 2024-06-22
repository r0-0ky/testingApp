'use client';

import { createTheme } from "@mui/material";

export const light = createTheme({
  palette: {
    background: {
      paper: '#1976d2',
      default: '#FFFF'
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
    action: {
      active: '#000',
    },
    success: {
      main: '#009688',
    },
  },
});
