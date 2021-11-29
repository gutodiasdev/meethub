import { Flex, Grid, Box, Heading, Text, VStack, SimpleGrid, Stack, Icon } from '@chakra-ui/react'
import { BiNetworkChart } from 'react-icons/bi'
import { IoSchool } from 'react-icons/io5'
import { FaHandshake } from 'react-icons/fa'
import { RiTeamFill } from 'react-icons/ri'
import { FounderAndClevels } from '../components/HomeContent/FounderAndClevels'
import { UserFooter } from '../components/UserFooter'
import { UserHeader } from '../components/UserHeader'

export default function ParaSuaEmpresa() {
  return (
    <Flex
      direction="column"
      w={1280}
      maxW={1480}
      px="5"
      mx="auto"
    >
      <UserHeader />
      <Grid templateColumns="1fr 1fr" my="12">
        <Box>
          <Heading>Receba gratuitamente um programa de mentorias desenvolvido para sua empresa.</Heading>
          <VStack spacing="4" my="4">
            <Text color="gray.600">
              Já parou pra pensar que as principais decisões de uma empresa são tomadas dentro de uma conversa? Pois é, aqui a gente acredita no poder de uma boa conversa como canal de desenvolvimento e resolução de problemas. Por isso construimos um time único de especialistas que vão ajudar sua empresa através de mentorias, consultorias, conselhos e conversas.
            </Text>
            <Text color="gray.600">
              Após o preenchimento você vai receber o contanto do seu consultor MeetHub, através de um diagnóstico ele vai entender o momento da sua empresa e seus principais desafios, construindo assim um programa exclusivo para sua necessidade .
            </Text>
          </VStack>
        </Box>
        <Box>

        </Box>
      </Grid>
      <FounderAndClevels />
      <Flex direction="column" align="center" mb={20}>
        <Heading as="h2" color="gray.900" fontSize="5xl">Por que escolher a MeetHub?</Heading>
        <Text color="gray.500" mt={3} fontSize="lg">6 motivos para fazermos parte da sua história!</Text>
        <SimpleGrid columns={2} w="100%" px={32} py={10} gap={5}>
          <Stack bg="blue.500" borderRadius="8px" p={8} >
            <Icon color="white" fontSize="24px" as={IoSchool} />
            <Heading size="md" color="white">Aprendizado sem enrolação</Heading>
            <Text color="gray.200">Chega de conteúdo genérico. Na MeetHub, você irá aprender com os mais experientes profissionais do mercado, de forma customizada e focada 100% em resolver o seu problema.</Text>
          </Stack>
          <Stack bg="blue.500" borderRadius="8px" p={8} >
            <Icon color="white" fontSize="24px" as={RiTeamFill} />
            <Heading size="md" color="white">Time único</Heading>
            <Text color="gray.200">Imagine os nossos especialistas como parte da sua equipe, auxiliando na elaboração, execução de planos e superação de desafios. Sua equipe e a MeetHub sendo um único time!</Text>
          </Stack>
          <Stack bg="blue.500" borderRadius="8px" p={8} >
            <Icon color="white" fontSize="24px" as={FaHandshake} />
            <Heading size="md" color="white">Consultor MeetHub</Heading>
            <Text color="gray.200">Um consultor dedicado ao seu projeto, entendendo suas necessidades e selecionando os especialistas que mais fazem sentido para o seu momento.</Text>
          </Stack>
          <Stack bg="blue.500" borderRadius="8px" p={8} >
            <Icon color="white" fontSize="24px" as={BiNetworkChart} />
            <Heading size="md" color="white">Todas as áreas do mercado</Heading>
            <Text color="gray.200">Não importa sua necessidade, teremos o melhor profissional disponível para te ajudar em poucos cliques.</Text>
          </Stack>
        </SimpleGrid>
      </Flex>
      <Flex direction="column" align="center" mb={20}>
        <Heading as="h2" color="gray.900" fontSize="5xl">Ajudamos sua empresa nas seguintes áreas</Heading>
        <SimpleGrid columns={5} w="100%" px={16} py={10} gap={5}>
          <Flex bg="gray.300" borderRadius="8px" boxShadow="lg" align="center" textAlign="center" justify="center">
            <Heading p="4" fontSize="2xl">Recursos humanos</Heading>
          </Flex>
          <Flex bg="gray.300" borderRadius="8px" boxShadow="lg" align="center" textAlign="center" justify="center">
            <Heading p="4" fontSize="2xl">Jurídico</Heading>
          </Flex>
          <Flex bg="gray.300" borderRadius="8px" boxShadow="lg" align="center" textAlign="center" justify="center">
            <Heading p="4" fontSize="2xl">Marketing e Vendas</Heading>
          </Flex>
          <Flex bg="gray.300" borderRadius="8px" boxShadow="lg" align="center" textAlign="center" justify="center">
            <Heading p="4" fontSize="2xl">Financeiro</Heading>
          </Flex>
          <Flex bg="gray.300" borderRadius="8px" boxShadow="lg" align="center" textAlign="center" justify="center">
            <Heading p="4" fontSize="2xl">Liderança e Performance</Heading>
          </Flex>
        </SimpleGrid>
      </Flex>
      <UserFooter />
    </Flex>
  )
}