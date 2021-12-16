import { GridItem, Flex, Center, Avatar, Box, Tag, Heading, Text, Spinner, SkeletonText } from "@chakra-ui/react";
import { database } from "faker/locale/en_AU";
import { useQuery } from "react-query";
import { api } from "../../services/apiClient";

type Category = {
  name: string;
}

interface MentorContainerProps {
  mentorId: string;
  mentorName: string;
  mentorImage?: string;
  mentorPosition: string;
}

export function MentorContainer({ mentorId, mentorName, mentorPosition, mentorImage }: MentorContainerProps) {

  const {data, isLoading, error } = useQuery('categories', async() => {

    const { data } = await api.get(`/mentors/${mentorId}`)

    const categories = data[0].categories.map(category => {
      return {
        name: category.name,
        id: category.id,
      }
    })

    return categories

  })

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
          <Avatar size="xl" name={mentorName} src={mentorImage}/>
        </Center>
        <Box textAlign="center">
          {isLoading ? (
            <SkeletonText noOfLines={1} my="3"><Tag size="sm" my="3"></Tag></SkeletonText>
          ) : error ? (
              <Box h={8}></Box>
          ) : (
            data.map(category => {
              return (
                <Tag mx={1} size="sm" my="3" key={category.id}>{category.name}</Tag>
              )
            })
          )}
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