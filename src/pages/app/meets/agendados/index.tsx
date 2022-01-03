import {
  Flex,
  Center,
  Avatar,
  Box,
  HStack,
  Heading,
  Tag,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Icon
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import NextLink from 'next/link'

import AppContainer from "../../../../components/AppContainer";
import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { WhoCanUse } from "../../../../components/WhoCanUse";
import { api } from "../../../../services/apiClient";
import { RiAddFill, RiEditBoxLine } from "react-icons/ri";

export default function Booked({ user }) {
  const [hasMeetAsUser, setHasMeetAsUser] = useState(true)

  const { data, isLoading, error } = useQuery('UserMeetsAndMentorMeets', async () => {
    const { data } = await api.post('/meets/my', { userId: user.id })
    const asMentor = data.asMentor.map(meet => {
      return {
        id: meet.id,
        image: meet.image,
        meetDetails: meet.meetDetails,
        name: meet.name,
        price: meet.price,
      }
    })

    const asUser = data.asUser.map(meet => {
      return {
        id: meet.id,
        image: meet.image,
        meetDetails: meet.meetDetails,
        name: meet.name,
        price: meet.price,
      }
    })

    if (asUser.length === 0) {
      setHasMeetAsUser(false)
    }

    return { asMentor: asMentor, asUser: asUser }
  }, {
    staleTime: 1000 * 60 * 15 // 15 minutes
  })

  return (
    <AppContainer>
      <Flex
        w="100%"
        direction='column'
      >
        <WhoCanUse roles={['user']}>
          {isLoading ? (
            <Flex>
              <Spinner />
            </Flex>
          ) : error ? (
            <Heading size='md' color='gray.600'>
              Desculpe, ocorreu algum erro
            </Heading>
          ) : (
            data.asUser.map(meet => {
              return (
                <Flex
                  key={meet.id}
                  bg="white"
                  boxShadow='base'
                  borderRadius="lg"
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
                      {meet.name}</Heading>
                    <Text
                      color="gray.500"
                      fontWeight="thin"
                    >
                      {meet.description}</Text>
                  </Box>
                  <NextLink
                    href={`sala/${meet.id}`}
                    passHref
                  >
                    <Button
                      as="a"
                      colorScheme="blue"
                    >
                      Entrar na sala
                    </Button>
                  </NextLink>
                </Flex>
              )
            })
          )}
        </WhoCanUse>

        <WhoCanUse roles={['mentor']}>
          <Tabs w="100%">
            <TabList>
              <Tab>Como usuário</Tab>
              <Tab>Como mentor</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {isLoading ? (
                  <Flex>
                    <Spinner />
                  </Flex>
                ) : error ? (
                  <Heading size='md' color='gray.600'>
                    Desculpe, ocorreu algum erro
                  </Heading>
                ) : !hasMeetAsUser ? (
                  <Heading size='md' color='gray.600'>
                    Você ainda não tem meets como usuário ...
                  </Heading>
                ) : (
                  data.asUser.map(meet => {
                    return (
                      <Flex
                        key={meet.id}
                        bg="white"
                        boxShadow='base'
                        borderRadius='lg'
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
                            {meet.name}</Heading>
                          <Text
                            color="gray.500"
                            fontWeight="thin"
                          >
                            {meet.description}</Text>
                        </Box>
                        <NextLink
                          href={`sala/${meet.id}`}
                          passHref
                        >
                          <Button
                            as="a"
                            colorScheme="blue"
                          >
                            Entrar na sala
                          </Button>
                        </NextLink>
                      </Flex>
                    )
                  })
                )}

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