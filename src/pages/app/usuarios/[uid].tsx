import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { setupAPIClient } from "../../../services/api";

const User = ({ users }) => {
  const [user, setUser] = useState(users);


  return (
    <AppContainer>
      <Flex
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="8"
        width="100%"
        p="8"
      >
        <Box
          flex="1"
          columnSpan={4}
          direction="column"
          h="100%"
        >
          <HStack>
            <Tag size="sm">Marketing</Tag>
            <Tag size="sm">Carreira</Tag>
          </HStack>
          <Heading
            size="md"
            mt="2"
            mb="2"
          >
            {user.email}
          </Heading>
        </Box>

      </Flex>
      <Flex width="100%" pt="4">
        <Tabs variant="enclosed" width="100%" >
          <TabList>
            <Tab>Meus meets</Tab>
            <Tab>Meus Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              Reviews
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const parsedId = ctx.query.uid.toString()
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`users/${parsedId}`);

  console.log(response.data);

  return {
    props: {
      users: response.data
    }
  }
})

export default User