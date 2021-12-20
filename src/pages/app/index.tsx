import { Avatar, Box, Flex, Heading, Icon, SimpleGrid, Spinner, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery } from 'react-query'

import AppContainer from "../../components/AppContainer";
import { DebounceInput } from 'react-debounce-input'
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { RiSearchLine } from "react-icons/ri";

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

    return mentorsResults

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

  console.log(mutation.data)

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
            )}
          </Flex>
        ) : (
          mutation.isLoading ? (

            <Flex>
              <Spinner />
            </Flex>

          ) : mutation.isSuccess ? (

            <SimpleGrid templateColumns='repeat(4, 1fr)' gap={4} w='100%'>
              {mutation.data.map(result => {
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
