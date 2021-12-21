import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { addDays, addYears, format, getDay, setDay, startOfWeek } from 'date-fns'
import { ptBR } from "date-fns/locale";

import AppContainer from "../../../../components/AppContainer";
import { DayOfWeek } from "../../../../components/DayOfWeek";

export default function AgendaMentor() {

  const firstDOW = startOfWeek(new Date())
  const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => format(addDays(firstDOW, i), 'eee', { locale: ptBR }))

  return (
    <AppContainer>
      <Flex w='100%' direction='column'>
        <Heading>Dias em que estou disponível</Heading>
        <SimpleGrid w='100%' templateColumns='repeat(7, 1fr)' my='8' gap='4'>
          {shortWeekDaysArray.map((key, index) => {
            return (
              <DayOfWeek
                key={index}
                dayName={key}
                dayValue={index}
              />
            )
          })}
        </SimpleGrid>
      </Flex>
    </AppContainer>
  )
}