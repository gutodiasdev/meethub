import { useState } from "react";
import { Flex, Box, HStack, Tag, Heading, Text, Center, Grid, GridItem } from '@chakra-ui/react';

import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import AppContainer from "../../../../components/AppContainer";
import { useForm } from "react-hook-form";


const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);
  const [selectedDate, setSelectedDate] = useState(false)

  const { register, formState } = useForm()

  function handleBookingDateClick() {
    if (!selectedDate) {
      setSelectedDate(true);
    } else {
      setSelectedDate(false);
    }
  }

  return (
    <AppContainer>
      <Flex
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="8"
        width="100%"
        p="4"
      >
        <Box
          flex="1"
          columnSpan={4}
          direction="column"
          h="100%"
        >
          <HStack>
            <Tag size="sm">Marketing</Tag>
            <Tag size="sm">Carreira</Tag>
          </HStack>
          <Heading
            size="md"
            mt="2"
            mb="2"
          >
            {meets.name}</Heading>
          <Text
            color="gray.500"
          >
            {meets.meetDetails}</Text>
        </Box>

      </Flex>
      <HStack
        w="100%"
        py="4"
      >
        {!selectedDate ? (
          <Center
            border="1px"
            w="100px"
            h="100px"
            borderColor="gray.100"
            borderRadius={8}
            transitionDuration="2"
            cursor="pointer"
            onClick={handleBookingDateClick}
            textAlign="center"
            flexDirection="column"
          >
            <Text color="gray.400" fontSize="xs">DEZ</Text>
            <Heading>03</Heading>
            <Text>21:00</Text>
          </Center>
        ) : (
          <Center
            w="100px"
            h="100px"
            bg="blue.500"
            borderRadius={8}
            cursor="pointer"
            onClick={handleBookingDateClick}
            textAlign="center"
            flexDirection="column"
          >
            <Text color="gray.100" fontSize="xs">DEZ</Text>
            <Heading color="white">03</Heading>
            <Text color="white">21:00</Text>
          </Center>
        )}
      </HStack>
      <Flex w="100%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem columnSpan={1}>

          </GridItem>
          <GridItem columnSpan={1}>

          </GridItem>
        </Grid>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${ctx.query.id}`);

  console.log(response.data);

  return {
    props: {
      meet: response.data
    }
  }
})

export default Meet