import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Source Sans Pro',
  },
  styles: {
    global: {
      
      body: {
        bg: 'white',
        color: 'gray.900'
      }
    }
  }
})