import { Box, SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <SimpleGrid
      templateColumns='200px 1fr'
      h="100vh"
      bg='gray.50'
    >
      <Sidebar />
      <Box
        p='8'
        overflow='auto'
      >
        {children}
      </Box>
    </SimpleGrid>
  )
}