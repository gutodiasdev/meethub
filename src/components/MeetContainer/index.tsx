import {
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
interface MeetContainerProps {
  meetId: string,
  meetName: string,
  meetPrice: string,
  mentorId?: string,
  href: string,
}

export function MeetContainer({ meetId, meetPrice, meetName, href }: MeetContainerProps) {
  return (
    <NextLink
      href={href}
      passHref
    >
      <Flex
        as="a"
        cursor="pointer"
        key={meetId}
        bg="white"
        width="100%"
        direction="column"
        boxShadow='md'
        borderRadius='lg'
        p='8'
        mb='6'
      >
        <Flex
          justify="space-between"
        >
          <Flex>
            {/* {isLoading ? (
              <Box>
                <SkeletonCircle size='12' />
              </Box>
            ) : error ? (
              <Flex>
                <Avatar
                  size="md"
                  name=''
                />
              </Flex>
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
            )} */}
          </Flex>
          <Flex>
            <Text
              fontSize="xl"
              font
              color="gray.500"
            >
              {Number(meetPrice).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
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
            color='gray.700'
            fontWeight='600'
          >
            {meetName}
          </Heading>
        </Flex>
      </Flex>
    </NextLink>
  )
}