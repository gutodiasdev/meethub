import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { MentorContainer } from '../../../components/MentorContainer';
import { setupAPIClient } from '../../../services/api';
import { useMentors } from '../../../services/hooks/mentors/useMentors';
import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function Mentors() {

  const { data, isLoading } = useMentors()

  return (
    <AppContainer>
      <Flex direction="column">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {isLoading ? (
            <Spinner />
          ) : (
            data.map(mentor => {
              return (
                <GridItem colSpan={1}>
                  <MentorContainer
                    key={mentor.id}
                    mentorId={mentor.id}
                    mentorName={mentor.name}
                    mentorPosition={mentor.position}
                    mentorImage={mentor.image}
                  />
                </ GridItem>
              )
            })
          )}
        </Grid>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const me = await apiClient.get(`/me`);

  return {
    props: {}
  }
})
