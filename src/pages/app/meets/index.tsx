import { Center, Flex, Text, VStack } from '@chakra-ui/react'
import { useQuery } from 'react-query';
import AppContainer from "../../../components/AppContainer";
import { MeetContainer } from '../../../components/MeetContainer';
import { IsLoadingMeetList } from '../../../components/MeetContainer/IsLoadingMeetList';
import { setupAPIClient } from '../../../services/api';
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

  const { data, isLoading, error } = useQuery('meets', getMeets)

  return (
    <AppContainer>
      <Flex
        w="100%"
      >
      </Flex>
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
