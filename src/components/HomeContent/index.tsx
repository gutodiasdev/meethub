import { Flex, Heading, Box } from '@chakra-ui/react'
import { OurExperts } from '../OurExperts'
import { FounderAndClevels } from './FounderAndClevels'
import { WhyChooseUs } from './WhyChooseUs'

export function HomeContent() {
  return (
    <Flex direction="column">
      <FounderAndClevels />

      <Box mb={20}>
        <Heading textAlign="center" mt={48} mx={5} color="gray.900">Aqui chamamos de meet nossas consultorias, mentorias e conselhos. Sempre de forma direta, sem enrolação e com infinitas possibilidades dentro de 1 hora.</Heading>
        <Box h={500}></Box>
      </Box>

      <WhyChooseUs />
      <OurExperts />
    </Flex>
  )
}