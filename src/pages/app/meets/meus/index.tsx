import AppContainer from "../../../../components/AppContainer";
import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Flex, Center, Avatar, Box, HStack, Heading, Tag, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'

export default function MyMeets({ meet }) {

  return (
    <AppContainer>
      <Flex w="100%">
        <Tabs w="100%">
          <TabList>
            <Tab>Como usuário</Tab>
            <Tab>Como mentor</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {meet.asUser.map(meetItem => {
                return (
                  <Flex
                    cursor="pointer"
                    key={meetItem.id}
                    bg="white"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="8"
                    width="100%"
                    p="4"
                    mb="4"
                  >
                    <Center
                      w="150px"
                    >
                      <Avatar size="lg" />
                    </Center>
                    <Box
                      flex="1"
                      columnSpan={4}
                      direction="column"
                      h="100%"
                    >
                      <HStack>
                        <Tag size="sm">Marketing</Tag>
                      </HStack>
                      <Heading
                        size="md"
                        mt="2"
                        mb="1"
                      >
                        {meetItem.name}</Heading>
                      <Text
                        color="gray.500"
                        fontWeight="thin"
                      >
                        {meetItem.description}</Text>
                    </Box>
                    <Button
                      as="a"
                      href={`/app/meets/room/${meet.room}`}
                      colorScheme="blue"
                      disabled
                    >
                      Entrar na sala
                    </Button>
                  </Flex>
                )
              })}
            </TabPanel>
            <TabPanel>
              {meet.asMentor.map(meetItem => {
                return (
                  <Flex
                    cursor="pointer"
                    key={meetItem.id}
                    bg="white"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="8"
                    width="100%"
                    p="4"
                    mb="4"
                  >
                    <Center
                      w="150px"
                    >
                      <Avatar size="lg" />
                    </Center>
                    <Box
                      flex="1"
                      columnSpan={4}
                      direction="column"
                      h="100%"
                    >
                      <HStack>
                        <Tag size="sm">Marketing</Tag>
                      </HStack>
                      <Heading
                        size="md"
                        mt="2"
                        mb="1"
                      >
                        {meetItem.name}</Heading>
                      <Text
                        color="gray.500"
                        fontWeight="thin"
                      >
                        {meetItem.description}</Text>
                    </Box>
                  </Flex>
                )
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/mymeets/${ctx.query.id}`);

  console.log(response.data);

  return {
    props: {
      meet: response.data
    }
  }
})