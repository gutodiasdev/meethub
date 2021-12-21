import { Avatar, Flex, Heading, HStack, Spinner, Tag, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { api } from '../../services/apiClient'
interface MeetContainerProps {
  meetId: string,
  meetName: string,
  meetPrice: string,
  mentorId?: string,
  href: string,
}

export function MeetContainer({ meetId, meetPrice, meetName, mentorId, href }: MeetContainerProps) {
  const { data, isLoading } = useQuery('mentor', async () => {
    const response = await api.get(`/mentors/${mentorId}`)
    const singleMentor = response.data.map(mentor => {
      return {
        name: mentor.name,
        position: mentor.position,
      }
    })
    return singleMentor
  })
  return (
    <Flex
      as="a"
      // href={`meets/${meetId}`}
      href={href}
      cursor="pointer"
      key={meetId}
      bg="white"
      border="1px"
      borderColor="gray.200"
      borderRadius="8"
      width="100%"
      direction="column"
      p="4"
      mb={4}
    >
      <Flex
        justify="space-between"
      >
        <Flex>
          {isLoading ? (
            <Flex><Spinner /></Flex>
          ) : (
            data.map(mentor => {
              return (
                <Flex key={meetId}>
                  <Avatar
                    size="md"
                    name={mentor.name}
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
                      {mentor.name}
                    </Heading>
                    <Text
                      mt="-1"
                      fontSize="xs"
                      color="gray.400"
                    >
                      {mentor.position}
                    </Text>
                  </Flex>
                </Flex>

              )
            })
          )}
        </Flex>
        <Flex>
          <Text
            fontSize="xl"
            color="gray.500"
          >
            R${meetPrice}
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
        <Heading
          size="lg"
          mt="2"
          mb="1"
        >
          {meetName}</Heading>
      </Flex>
    </Flex>
  )
}