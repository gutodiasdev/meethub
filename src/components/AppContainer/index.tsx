import { Grid, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <Grid
    // gridTemplateColumns="200px 1fr"
    >
      <Sidebar />
      <VStack
        p="6"
        ml="200px"
      >
        {children}
      </VStack>
    </Grid>
  )
}