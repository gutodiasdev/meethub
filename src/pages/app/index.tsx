import { Avatar, Box, Flex, Heading, Image, SimpleGrid, Spinner, Tag, Text } from "@chakra-ui/react";
import { useQuery } from 'react-query'

import AppContainer from "../../components/AppContainer";
import { Search } from "../../components/Header/Search";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function App() {
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

  const settings = {
    className: "center",
    // centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2
  };
  return (
    <AppContainer>
      <Flex direction='column'>
        <Search />
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
                        return <Tag mx={1} size='sm' borderRadius='full'>{name.name}</Tag>
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
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
