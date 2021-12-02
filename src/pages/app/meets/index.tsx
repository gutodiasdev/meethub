import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { setupAPIClient } from '../../../services/api';
import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function Meets({ meet }) {

  return (
    <AppContainer>
      {meet.map(meetItem => {
        return (
          <Flex
            as="a"
            href={`meets/${meetItem.id}`}
            cursor="pointer"
            key={meetItem.id}
            bg="white"
            border="1px"
            borderColor="gray.100"
            borderRadius="8"
            width="100%"
            p="4"
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
                {meetItem.name}</Heading>
              <Text
                color="gray.500"
                fontWeight="thin"
              >
                {meetItem.description}</Text>
            </Box>
          </Flex>
        )
      })}
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets`);

  console.log(response.data);

  return {
    props: {
      meet: response.data
    }
  }
})
