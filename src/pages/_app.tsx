import { AppProps } from "next/app"
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarContextDrawer"
// import { makeServer } from "../services/mirage"
import { AuthProvider } from "../contexts/AuthContext";
import { ApiProvider } from "../contexts/ApiContext";

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <ApiProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </ApiProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>

  )
}

export default MyApp
