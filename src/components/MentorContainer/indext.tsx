import { GridItem, Flex, Center, Avatar, Box, Tag, Heading, Text } from "@chakra-ui/react";

type Category = {
  name: string;
}

interface MentorContainerProps {
  mentorId: string;
  mentorName: string;
  mentorPosition: string;
  mentorCagetories?: Category[];
}

export function MentorContainer({ mentorId, mentorName, mentorPosition, mentorCagetories }: MentorContainerProps) {
  return (
    <GridItem key={mentorId} colSpan={1}>
      <Flex
        as="a"
        direction="column"
        href={`mentores/${mentorId}`}
        cursor="pointer"
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
          <Tag size="sm" my="3">{mentorCagetories}</Tag>
          <Heading
            size="md"
          >
            {mentorName}</Heading>
          <Text
            color="gray.500"
            fontWeight="thin"
          >
            {mentorPosition}</Text>
        </Box>
      </Flex>
    </GridItem>
  )
}