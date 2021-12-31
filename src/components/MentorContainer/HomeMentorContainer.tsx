import {
  Avatar,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react"

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
    <Flex
      direction='column'
      key={mentorId}
      border='1px'
      borderColor='gray.200'
      borderRadius='md'
      colSpan={1}
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
      <Heading
        as='h2'
        size='md'
      >
        {mentorName}
      </Heading>
      <Text
        color='gray.400'
      >
        {mentorPosition}
      </Text>
    </Flex>
  )
}
