import { Avatar, Heading, Flex, Text, HStack, Tag, VStack } from '@chakra-ui/react'
import AppContainer from "../../../components/AppContainer";
import { Search } from '../../../components/Header/Search';
import { setupAPIClient } from '../../../services/api';
import { withSSRAuth } from '../../../utils/withSSRAuth';

export default function Meets({ meet }) {



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
        {meet.map(meetItem => {
          return (
            <Flex
              as="a"
              href={`meets/${meetItem.id}`}
              cursor="pointer"
              key={meetItem.id}
              bg="white"
              border="1px"
              borderColor="gray.200"
              borderRadius="8"
              width="100%"
              direction="column"
              p="4"
            >
              <Flex
                justify="space-between"
              >
                <Flex>
                  <Avatar
                    size="md"
                    name="Henrique Tarciano"
                  />
                  <Flex
                    direction="column"
                    justify="center"
                    ml={2}
                  >
                    <Heading
                      size="sm"
                      color="gray.600"
                      fontWeight="normal"
                    >
                      Fulano
                    </Heading>
                    <Text
                      mt="-1"
                      fontSize="xs"
                      color="gray.400"
                    >
                      COO - Meethub
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Text
                    fontSize="xl"
                    color="gray.500"
                  >
                    R${meetItem.price}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                flex="1"
                columnSpan={4}
                direction="column"
                h="100%"
                mt={4}
              >
                <HStack>
                  <Tag size="sm">Marketing</Tag>
                </HStack>
                <Heading
                  size="lg"
                  mt="2"
                  mb="1"
                >
                  {meetItem.name}</Heading>
                <Text
                  color="gray.500"
                  fontWeight="thin"
                >
                  {meetItem.description}</Text>
              </Flex>
            </Flex>
          )
        })}
      </VStack>
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
