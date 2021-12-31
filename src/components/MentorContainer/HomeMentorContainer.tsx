import {
  Avatar,
  Box,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react"
import NextLink from 'next/link'

interface HomeMentorContainerProps {
  mentorId: string;
  mentorImage: string;
  mentorName: string;
  mentorCategories: [{
    name: string;
  }];
  mentorPosition: string;
}

export function HomeMentorContainer({
  mentorId,
  mentorImage,
  mentorName,
  mentorCategories,
  mentorPosition,
}: HomeMentorContainerProps) {
  return (
    <NextLink
      href={`/app/mentores/${mentorId}`}
      passHref
    >
      <Flex
        as='a'
        direction='column'
        key={mentorId}
        minH='64'
        justify='space-between'
        bg='white'
        boxShadow='md'
        borderRadius='md'
        p={6}
        align='center'
      >
        <Avatar
          size='xl'
          src={mentorImage}
          name={mentorName}
        />
        <Flex
          w='100%'
          justify='center'
          my={2}
          minH={5}
        >
          {mentorCategories.slice(0, 5).map(name => {
            return <Tag
              key={name.name}
              mx={1}
              size='sm'
              borderRadius='full'
            >
              {name.name}
            </Tag>
          })}
        </Flex>
        <Box
          textAlign='center'
        >
          <Heading
            as='h2'
            size='md'
          >
            {mentorName}
          </Heading>
          <Text
            color='gray.500'
          >
            {mentorPosition}
          </Text>
        </Box>
      </Flex>
    </NextLink>
  )
}
