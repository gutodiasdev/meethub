import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { addDays, eachHourOfInterval, endOfTomorrow, format, startOfTomorrow, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { DayOfWeek } from './DayOfWeek'
import { Hours } from './Hours'

function Schedule() {

  const startOfTheWeek = startOfWeek(new Date())
  const weekDays = Array.from(Array(7)).map(
    (e, i) => format(addDays(startOfTheWeek, i), 'eee', { locale: ptBR })
  )
  const tomorrowStart = startOfTomorrow()
  const tomorrowEnd = endOfTomorrow()

  const eachHour = eachHourOfInterval({
    start: tomorrowStart,
    end: tomorrowEnd
  })

  return (
    <>
      <Heading color='gray.700' size='md'>Dias em que estou disponível</Heading>
      <Text color='gray.500'>Escolha os dias da semana em que você você terá disponibilidade</Text>
      <SimpleGrid w='100%' templateColumns='repeat(7, 1fr)' my='8' gap='4'>
        {weekDays.map((key, index) => {
          return (
            <DayOfWeek
              key={index}
              dayName={key}
              dayValue={index}
            />
          )
        })}
      </SimpleGrid>
      <Heading color='gray.700' size='md'>Horários em que estou disponível</Heading>
      <Text color='gray.500'>Escolha os horários do dia que você tem disponibilidade. As mentorias na Meethub
        duração mínima de 1 hora.</Text>
      <SimpleGrid w='100%' templateColumns='repeat(8, 1fr)' my='8' gap='4'>
        {eachHour.map((key, index) => {
          return <Hours key={index} hour={format(key, 'HH:mm')} />
        })}
      </SimpleGrid>
    </>
  )
}

export default Schedule
