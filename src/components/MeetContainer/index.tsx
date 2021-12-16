import { Avatar, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react'

interface MeetContainerProps {
  meetId: string,
  meetName: string,
  meetPrice: string,
}

export function MeetContainer({ meetId, meetPrice, meetName }: MeetContainerProps) {
  return (
    <Flex
      as="a"
      href={`meets/${meetId}`}
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
        <HStack>
          <Tag size="sm">Marketing</Tag>
        </HStack>
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