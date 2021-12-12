import { Grid, VStack, GridItem, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Profile } from "../Header/Profile";
import { Search } from "../Header/Search";

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      h="100vh"
    >
      <GridItem
        colSpan={2}
        borderRight="1px"
        borderColor="gray.200"
      >
        <Sidebar />
      </GridItem>
      <GridItem colSpan={10}>
        <Flex
          direction="column"
          p="6"
        >
          {children}
        </Flex>
      </GridItem>
    </Grid>
  )
}