import AppContainer from "../../../../components/AppContainer";
import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { Flex, Center, Avatar, Box, HStack, Heading, Tag, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Spinner, Icon } from '@chakra-ui/react'
import { WhoCanUse } from "../../../../components/WhoCanUse";
import { useQuery } from 'react-query'
import { api } from "../../../../services/apiClient";
import { RiAddFill, RiEditBoxLine } from "react-icons/ri";
import { FiTrash } from "react-icons/fi";

export default function MyMeets({ user }) {
  const { data, isLoading, error } = useQuery('meets', async () => {
    const { data } = await api.post('/meets/my', { userId: user.id })
    const meets = data.asMentor.map(meet => {
      return {
        id: meet.id,
        image: meet.image,
        meetDetails: meet.meetDetails,
        name: meet.name,
        price: meet.price,
      }
    })

    return { asMentor: meets }
  })

  console.log(data)

  return (
    <AppContainer>
      <Flex w="100%">
        <WhoCanUse permissions={['user']}>
          {/* {asUser.map(meetItem => {
            return (
              <Flex
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
                  target="_blank"
                  href={`/app/meets/meus-meets/sala/${meetItem.id}`}
                  colorScheme="blue"
                >
                  Entrar na sala
                </Button>
              </Flex>
            )
          })} */}
        </WhoCanUse>

        <WhoCanUse roles={['mentor']}>
          <Tabs w="100%">
            <TabList>
              <Tab>Como usuário</Tab>
              <Tab>Como mentor</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* {asUser.map(meetItem => {
                  return (
                    <Flex
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
                        href={`sala/${meetItem.id}`}
                        target="_blank"
                        colorScheme="blue"
                      >
                        Entrar na sala
                      </Button>
                    </Flex>
                  )
                })} */}
              </TabPanel>
              <TabPanel>
                <Flex justify='right'>
                  <Button rightIcon={<RiAddFill />} colorScheme='blue' mb='8' >
                    Adicionar novo
                  </Button>
                </Flex>
                {isLoading ? (
                  <Flex>
                    <Spinner />
                  </Flex>
                ) : (
                  data.asMentor.map(meetItem => {
                    return (
                      <Flex
                        justify='space-between'
                        key={meetItem.id}
                        bg="white"
                        border="1px"
                        borderColor="gray.100"
                        borderRadius="8"
                        width="100%"
                        p="4"
                        mb="4"
                      >
                        <Flex mr='2' >
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
                        <Box textAlign='right'>
                          <Icon as={RiEditBoxLine} cursor='pointer' _hover={{ stroke: 'red' }} />
                          <Icon as={FiTrash} cursor='pointer' ml='2' />
                        </Box>
                      </Flex>
                    )
                  })
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </WhoCanUse>


      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`/me`);

  return {
    props: {
      user: response.data
    }
  }
})