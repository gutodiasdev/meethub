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
        borderColor="gray.100"
      >
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7}>
        <VStack
          p="6"
        >
          {children}
        </VStack>
      </GridItem>
      <GridItem
        colSpan={3}
        borderLeft="1px"
        borderColor="gray.100"
      >
        <Flex
          p="4"
          borderBottom="1px"
          borderColor="gray.100"
          justify="flex-end"
        >
          <Profile />
        </Flex>
      </GridItem>
    </Grid>
  )
}