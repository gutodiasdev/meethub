import { useState } from "react";
import {
  Flex,
  Box,
  HStack,
  Tag,
  Heading,
  Text,
  Center,
  Button
} from '@chakra-ui/react';

import { setupAPIClient } from "../../../../../services/api";
import { withSSRAuth } from "../../../../../utils/withSSRAuth";
import AppContainer from "../../../../../components/AppContainer";
import { formatCurrency } from '../../../../../utils/formatCurrency'
import { useRouter } from 'next/router'

const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);
  const [selectedDate, setSelectedDate] = useState(false)
  const router = useRouter()

  function handleBookingDateClick() {
    if (!selectedDate) {
      setSelectedDate(true);
    } else {
      setSelectedDate(false);
    }
  }

  function handleBooking() {
    router.push(`/app/meets/agendar/${meets.id}/finalizar-agendamento/`)
  }

  return (
    <AppContainer>
      <Flex
        bg="white"
        boxShadow='base'
        borderRadius="lg"
        width="100%"
        p="8"
      >
        <Flex
          flex="1"
          h="100%"
          justify="space-between"
        >
          <Flex direction="column" flex="1" pr="4">
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
          </Flex>
          <Box>
            <Heading
              size="md"
              as='span'
              color="gray.500"
            >
              {formatCurrency(Number(meets.price))}
            </Heading>
          </Box>
        </Flex>

      </Flex>
      <HStack
        w="100%"
        p='8'
        bg='white'
        borderRadius='lg'
        mt='8'
        boxShadow='base'
      >
        {!selectedDate ? (
          <Center
            border="1px"
            w="100px"
            h="100px"
            bg='white'
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
      <Flex
        w='100%'
        justify='flex-end'
        my='8'
      >
        <Button
          colorScheme='blue'
          size='lg'
          onClick={handleBooking}
        >
          Finalizar agendamento
        </Button>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${ctx.query.id}`)

  return {
    props: {
      meet: response.data
    }
  }
})

export default Meet