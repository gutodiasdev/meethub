import {
  Box,
  Heading,
  Flex,
  HStack,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
  Image,
  Avatar,
  Text,
  Spinner
} from '@chakra-ui/react'
import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { useQuery } from 'react-query';
import { api } from '../../../services/apiClient';
import { WhoCanUse } from '../../../components/WhoCanUse';


const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);
  const [isResponsible, setIsResponsible] = useState(false);
  const mentorId = meets.members[0].userId

  const { data, isLoading } = useQuery('mentor', async () => {
    const response = await api.get(`mentors/${mentorId}`)

    const mentor = response.data.map(info => {
      return {
        id: info.id,
        name: info.name,
        position: info.position,
        biography: info.biography,
      }
    })

    return mentor

  }, {
    staleTime: 1000 * 60 * 15
  })

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
          <Flex justify="space-between">
            <Flex mr={4}>
              {meet.categories.map((key, index) => {
                return (
                  <Tag mr={4} borderRadius='full' size="lg" key={index}>{key.name}</Tag>
                )
              })}
            </Flex>
            <Flex>
              <Text fontSize="3xl">{`R$${meet.price}`}</Text>
            </Flex>
          </Flex>
          <Image src={meets.image} alt={meets.name} borderRadius={8} my={8} maxH={56} w="100%" />
          <Heading
            size="lg"
            mt="2"
            mb="2"
          >
            {meets.name}</Heading>
          <Box color="gray.500" fontSize="1.2rem">
            {ReactHtmlParser(meets.meetDetails)}
          </Box>
        </Box>
      </Flex>
      <Flex width="100%" justify="flex-end">
        <WhoCanUse roles={['mentor']} >
          <Button
            variant='outline'
            mt={4}
            href={`agendar/${meets.id}`}
            colorScheme="blue"
            size="lg"
            mr={4}
          >
            Editar meet
          </Button>
        </WhoCanUse>
        <Button
          as="a"
          mt={4}
          href={`agendar/${meets.id}`}
          colorScheme="blue"
          size="lg"
        >
          Agendar um meet
        </Button>
      </Flex>
      <Flex width="100%" pt="4" mb={48}>
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
              {isLoading ? (
                <Spinner />
              ) : (
                <Flex direction="column" w="100%">
                  {data.map(mentor => {
                    return (
                      <>
                        <Flex
                          key={mentor.id}
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="8px"
                          maxHeight="250px"
                          p={6}
                          my={4}
                        >
                          <Avatar size="xl" src={mentor.image} name={mentor.name} />
                          <Box ml={6}>
                            <Heading size="md">{mentor.name}</Heading>
                            <Text>{mentor.position}</Text>
                          </Box>
                        </Flex>
                        <Text>
                          {mentor.biography}
                        </Text>
                      </>
                    )
                  })}
                </Flex>
              )}

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

  return {
    props: {
      meet: response.data,
    }
  }
})

export default Meet