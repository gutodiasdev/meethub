import { AppProps } from "next/app"
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query';

import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarContextDrawer"
import { AuthProvider } from "../contexts/AuthContext";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (

    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>

  )
}
