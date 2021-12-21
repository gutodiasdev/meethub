import { Avatar, Box, Flex, Heading, Icon, SimpleGrid, Spinner, Tag, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery } from 'react-query'

import AppContainer from "../../components/AppContainer";
import { DebounceInput } from 'react-debounce-input'
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { RiSearchLine } from "react-icons/ri";
import { MeetContainer } from "../../components/MeetContainer";

export default function App() {
  const [isSearching, setIsSearching] = useState(false)
  const [theKeyword, setTheKeyword] = useState('')
  const { data, isLoading, error } = useQuery('mentors', async () => {
    const response = await api.get('mentors')

    const mentors = response.data.map(mentor => {
      return {
        id: mentor.id,
        name: mentor.name,
        categories: mentor.categories.map(category => {
          return {
            name: category.name,
          }
        }),
        image: mentor.image,
        position: mentor.position,
      }
    })

    return mentors
  })

  const meets = useQuery('meets', async () => {
    const response = await api.get('meets')

    const meets = response.data.map(meet => {
      return {
        id: meet.id,
        name: meet.name,
        price: meet.price,
        mentor: meet.members[0].userId
      }
    })

    return meets
  })

  const mutation = useMutation(async (keyword) => {
    const { data } = await api.post('search', { keyword })

    const mentorsResults = data.results.mentors.map(result => {
      return {
        id: result.id,
        name: result.name,
        result: result.image,
        position: result.position,
        categories: result.categories.map(category => {
          return {
            id: category.id,
            name: category.name,
          }
        })
      }
    })

    const meetsResults = data.results.meets.map(result => {
      return {
        id: result.id,
        name: result.name,
        price: result.price,
        mentor: result.members[0].userId
      }
    })

    return { mentors: mentorsResults, meets: meetsResults }

  })

  const handleSearch = async (data) => {
    if (data.value.length >= 3) {
      setIsSearching(true)
      await mutation.mutateAsync(data.value)

    } else if (data.value.length <= 3) {
      setIsSearching(false)
    }
  }

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2
  }

  return (
    <AppContainer>
      <Flex direction='column'>
        <Box w="100%">
          <Flex
            as="label"
            flex="1"
            py="4"
            px={4}
            mb={6}
            justify='space-between'
            maxWidth={400}
            alignSelf="center"
            color="gray.900"
            position="relative"
            border="1px"
            borderColor="gray.200"
            borderRadius="8px"
          >
            <DebounceInput
              minLength={3}
              debounceTimeout={750}
              onChange={event => handleSearch({ value: event.target.value })}
            />
            <Icon as={RiSearchLine} fontSize="20" />
          </Flex>
        </Box>
        {!isSearching ? (
          <Flex w='100%'>
            {isLoading ? (
              <Flex w='100%' align='center' justify='center'>
                <Spinner />
              </Flex>
            ) : error ? (
              <Text>Desculpe, houve algum erro durante tentarmos trazer os especialistas</Text>
            ) : (
              <Flex w='100%' direction='column'>
                <Heading size='lg' color='gray.600' my={4}>Mentores</Heading>
                <SimpleGrid templateColumns='repeat(4, 1fr)' gap={4} w='100%'>
                  {data.map(mentor => {
                    return (
                      <Flex
                        direction='column'
                        key={mentor.id}
                        border='1px'
                        borderColor='gray.200'
                        borderRadius='md'
                        colSpan={1}
                        p={6}
                        align='center'
                      >
                        <Avatar size='xl' src={mentor.image} name={mentor.name} />
                        <Flex w='100%' justify='center' my={2} minH={5}>
                          {mentor.categories.slice(0, 5).map(name => {
                            return <Tag key={name.name} mx={1} size='sm' borderRadius='full'>{name.name}</Tag>
                          })}
                        </Flex>
                        <Heading as='h2' size='md' >{mentor.name}</Heading>
                        <Text color='gray.400'>{mentor.position}</Text>
                      </Flex>
                    )
                  })}
                </SimpleGrid>
                <VStack mt={4} mb={16} spacing={4}>
                  <Heading size='lg' color='gray.600' mt={4} mr='auto'>Meets</Heading>
                  {meets.isLoading ? (
                    <Flex>
                      <Spinner />
                    </Flex>
                  ) : (
                    meets.data.map(meet => {
                      return (
                        <MeetContainer
                          href={`/app/meets/${meet.id}`}
                          key={meet.id}
                          meetId={meet.id}
                          meetName={meet.name}
                          meetPrice={meet.price}
                          mentorId={meet.mentor}
                        />
                      )
                    })
                  )}
                </VStack>
              </Flex>
            )}
          </Flex>
        ) : (
          mutation.isLoading ? (

            <Flex>
              <Spinner />
            </Flex>

          ) : mutation.isSuccess ? (
            <>
              <SimpleGrid templateColumns='repeat(4, 1fr)' gap={4} w='100%'>
                {mutation.data.mentors.map(result => {
                  return (
                    <Flex
                      direction='column'
                      key={result.id}
                      border='1px'
                      borderColor='gray.200'
                      borderRadius='md'
                      colSpan={1}
                      p={6}
                      align='center'
                    >
                      <Avatar size='xl' src={result.image} name={result.name} />
                      <Flex w='100%' justify='center' my={2} minH={5}>
                        {result.categories.slice(0, 5).map(name => {
                          return <Tag key={name.name} mx={1} size='sm' borderRadius='full'>{name.name}</Tag>
                        })}
                      </Flex>
                      <Heading as='h2' size='md' >{result.name}</Heading>
                      <Text color='gray.400'>{result.position}</Text>
                    </Flex>
                  )
                })}
              </SimpleGrid>
              <VStack mt={4} spacing={4}>
                {mutation.data.meets.map(meet => {
                  return (
                    <MeetContainer
                      href={`/app/meets/${meet.id}`}
                      key={meet.id}
                      meetId={meet.id}
                      meetName={meet.name}
                      meetPrice={meet.price}
                      mentorId={meet.mentor}
                    />
                  )
                })}
              </VStack>
            </>

          ) : (

            <Heading size='md' color='gray.500' >Não encontramos nenhum resultado...</Heading>

          )
        )}
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
