import { Box, Heading, Flex, Text, HStack, Tag, Tabs, TabList, Tab, TabPanel, TabPanels, Button, Avatar } from '@chakra-ui/react'
import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { useState } from "react";


const Meet = ({ meet, mentor }) => {
  const [meets, setMeets] = useState(meet);
  
  return (
    <AppContainer>
      <Flex
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="8"
        width="100%"
        p="4"
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
            {meets.name}</Heading>
          <Text
            color="gray.500"
          >
            {meets.meetDetails}</Text>
        </Box>

      </Flex>
      <Flex width="100%" justify="flex-end">
        <Button
          as="a"
          href={`agendar/${meets.id}`}
          colorScheme="blue"
          size="lg"
        >
          Agendar um meet
        </Button>
      </Flex>
      <Flex width="100%" pt="4">
        <Tabs variant="enclosed" width="100%" >
          <TabList>
            <Tab>Agenda</Tab>
            <Tab>Reviews</Tab>
            <Tab>Sobre o especialista</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              Reviews
            </TabPanel>
            <TabPanel>
              <Flex direction="column" w="100%">
                <Flex
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  maxHeight="250px"
                  p={6}
                  my={4}
                >
                  <Avatar size="xl" src={mentor.image} />
                  <Box ml={6}>
                  <Heading size="md">{mentor.name}</Heading>
                  <Text>{mentor.position}</Text>
                  </Box>
                </Flex>
                <Text>
                  {mentor.biography}
                </Text>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${ctx.query.id}`);

  const mentorId = response.data.members[0].userId;

  const mentorInfo = await apiClient.get(`/mentors/${mentorId}`)


  return {
    props: {
      meet: response.data,
      mentor:  mentorInfo.data,
    }
  }
})

export default Meet