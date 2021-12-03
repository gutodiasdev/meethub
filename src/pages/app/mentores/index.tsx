import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag, Grid, GridItem } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { setupAPIClient } from '../../../services/api';
import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function Mentors({ mentors }) {

  return (
    <AppContainer>
      <Grid
        templateColumns="repeat(3, 1fr)"
        w="100%"
        gap={4}
        p="4"
      >
        {mentors.map(mentor => {
          if (mentor.permissions === "mentor") {
            return (
              <GridItem columnSpan={1}>
                <Flex
                  as="a"
                  direction="column"
                  href={`mentores/${mentor.id}`}
                  cursor="pointer"
                  key={mentor.id}
                  border="1px"
                  borderColor="gray.100"
                  borderRadius="8"
                  p="4"
                  align="center"
                >
                  <Center
                    w="150px"
                  >
                    <Avatar size="xl" />
                  </Center>
                  <Box textAlign="center">
                    <Tag size="sm" my="3">Marketing</Tag>
                    <Heading
                      size="md"
                    >
                      {mentor.name}</Heading>
                    <Text
                      color="gray.500"
                      fontWeight="thin"
                    >
                      {mentor.position}</Text>
                  </Box>
                </Flex>
              </GridItem>
            )
          }
        })}
      </Grid>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`/users`);

  console.log(response.data);

  return {
    props: {
      mentors: response.data
    }
  }
})
