import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag, Grid, GridItem } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { MentorContainer } from '../../../components/MentorContainer/indext';
import { setupAPIClient } from '../../../services/api';
import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function Mentors({ mentors }) {
  return (
    <AppContainer>
      <Flex direction="column">
        <Grid templateColumns="repeat(4, 1fr)">
          {mentors.map(mentor => {
            return (
              <MentorContainer
                mentorId={mentor.id}
                mentorName={mentor.name}
                mentorPosition={mentor.position}
                // mentorCategories={mentor.dategories}
              />
            )
          })}
        </Grid>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`/mentors`);
  const me = await apiClient.get(`/me`);

  return {
    props: {
      mentors: response.data
    }
  }
})
