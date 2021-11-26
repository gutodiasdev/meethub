import { Flex, SimpleGrid, Text, Heading, Icon, Stack } from '@chakra-ui/react'
import { RiPinDistanceFill, RiQuestionAnswerFill, RiTeamFill } from 'react-icons/ri'
import { GiTargetPrize } from 'react-icons/gi'
import { BiNetworkChart } from 'react-icons/bi'
import { BsSignpostSplitFill } from 'react-icons/bs'

export function WhyChooseUs() {
  return (
    <Flex direction="column" align="center" mb={20}>
      <Heading as="h2" color="gray.900">Por que escolher a MeetHub?</Heading>
      <Text color="gray.500" mt={3} fontSize="lg">6 motivos para fazermos parte da sua história!</Text>
      <SimpleGrid columns={3} w="100%" px={32} py={10} gap={5}>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={RiPinDistanceFill} />
          <Heading size="md" color="gray.900">Encurte caminhos</Heading>
          <Text color="gray.500">Aprenda com pessoas que chegaram aonde você quer chegar e que já passaram pelo que você está passando.</Text>
        </Stack>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={GiTargetPrize} />
          <Heading size="md" color="gray.900">Sem conteúdo genérico</Heading>
          <Text color="gray.500">1 hora inteira focada nos seus desafios, ou do seu negócio. Como se o especialista fizesse parte do seu time.</Text>
        </Stack>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={RiTeamFill} />
          <Heading size="md" color="gray.900">Time único</Heading>
          <Text color="gray.500">Um time de especialistas que você só encontra aqui, com os maiores profissionais do mercado e nomes de grandes empresas.</Text>
        </Stack>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={BiNetworkChart} />
          <Heading size="md" color="gray.900">Muito além de networking</Heading>
          <Text color="gray.500">Muito além de uma conexão nas redes sociais, aqui a conversa é olho no olho.</Text>
        </Stack>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={RiQuestionAnswerFill} />
          <Heading size="md" color="gray.900">Respostas claras</Heading>
          <Text color="gray.500">Você não precisa de várias aulas pra chegar a uma resposta. Elas acontecem de forma instantânea dentro da sua conversa. </Text>
        </Stack>
        <Stack border="1px" borderColor="gray.300" borderRadius="8px" p={8} >
          <Icon color="blue.500" fontSize="24px" as={BsSignpostSplitFill} />
          <Heading size="md" color="gray.900">Várias possibilidades dentro de 1 hora</Heading>
          <Text color="gray.500">Você escolhe como vai usar. Uma validação, uma dica, uma opinião. São infinitas as possibilidades.</Text>
        </Stack>
      </SimpleGrid>
    </Flex>
  )
}