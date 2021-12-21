import { Box, Center, Flex, Heading, Icon, Spinner, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { RiSearchLine } from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';
import AppContainer from "../../../components/AppContainer";
import { MeetContainer } from '../../../components/MeetContainer';
import { IsLoadingMeetList } from '../../../components/MeetContainer/IsLoadingMeetList';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';
import { getMeets } from '../../../services/hooks/meets/useMeets'
import { withSSRAuth } from '../../../utils/withSSRAuth';

type Category = {
  name: string;
}

type Meet = {
  id: string
  name: string
  price: string
  mentor: {
    id: string,
  };
  categories: Category[];
}

export default function Meets() {
  const [isSearching, setIsSearching] = useState(false)
  const [theKeyword, setTheKeyword] = useState('')

  const { data, isLoading, error } = useQuery('meets', getMeets)

  const mutation = useMutation(async (keyword) => {
    const { data } = await api.post('search/meets', { keyword })

    const meetsResults = data.results.meets.map(result => {
      return {
        id: result.id,
        name: result.name,
        price: result.price,
        mentor: result.members[0].userId
      }
    })

    return { meets: meetsResults }

  })

  const handleSearch = async (data) => {
    if (data.value.length >= 3) {
      setIsSearching(true)
      await mutation.mutateAsync(data.value)

    } else if (data.value.length <= 3) {
      setIsSearching(false)
    }
  }

  return (
    <AppContainer>
      <Flex w="100%" direction="column" >
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
          <VStack
            w="100%"
            spacing={4}
          >
            {isLoading ? (
              <IsLoadingMeetList />
            ) : error ? (
              <Flex>
                <Center>
                  <Text>Erro ao recuperar os meets</Text>
                </Center>
              </Flex>
            ) : (
              <Flex direction="column">
                {data.slice(0).reverse().map(meet => {
                  return (
                    <MeetContainer
                      href={`/app/meets/${meet.id}`}
                      key={meet.id}
                      meetId={meet.id}
                      meetName={meet.name}
                      meetPrice={meet.price}
                      mentorId={meet.mentor[0].id}
                    />
                  )
                })}
              </Flex>
            )}
          </VStack>
        ) : (
          mutation.isLoading ? (
            <Flex>
              <Spinner />
            </Flex>
          ) : mutation.isSuccess ? (
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
          ) : (
            <Heading size='md' color='gray.500' >Não encontramos nenhum resultado...</Heading>
          )
        )}
      </Flex>
    </AppContainer>
  )
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('me');

  return {
    props: {}
  }
})
