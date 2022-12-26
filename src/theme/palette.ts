import { blue, red } from '@mui/material/colors'

const palette = {
  appBar: {
    light: '#f5f5f5',
    main: '#eceff1',
    dark: '#cfd8dc',
    contrastText: '#263238',
  },
  counter: {
    actions: {
      decrement: {
        light: red[200],
        main: red[300],
        dark: red[400],
        contrastText: red[50],
      },
      increment: {
        light: blue[200],
        main: blue[300],
        dark: blue[400],
        contrastText: blue[50],
      },
    },
  },
  background: { default: '#eee' },
}

export default palette
