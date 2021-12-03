import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { useState } from "react";


const Meet = ({ mentor }) => {
  const [mentors, setMentors] = useState(mentor);

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
        <Center>
          <Avatar size="lg" />
        </Center>
        <Box
          flex="1"
          direction="column"
          h="100%"
          ml={4}
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
            {mentors.name}</Heading>
          <Text
            color="gray.500"
          >
            {mentors.position}</Text>
        </Box>

      </Flex>
      <Flex width="100%" pt="4">
        <Tabs variant="enclosed" width="100%" >
          <TabList>
            <Tab>Meets</Tab>
            <Tab>Agenda</Tab>
            <Tab>Reviews</Tab>
            <Tab>Sobre o especialista</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              Reviews
            </TabPanel>
            <TabPanel>
              {mentor.biography}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`mentors/${ctx.query.id.toString()}`);

  console.log(response.data);

  return {
    props: {
      mentor: response.data
    }
  }
})

export default Meet