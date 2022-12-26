import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface Palette {
    appBar: SimplePaletteColorOptions
    counter: {
      actions: {
        decrement: SimplePaletteColorOptions
        increment: SimplePaletteColorOptions
      }
    }
  }

  interface PaletteOptions {
    appBar: SimplePaletteColorOptions
    counter: {
      actions: {
        decrement: SimplePaletteColorOptions
        increment: SimplePaletteColorOptions
      }
    }
  }
}
