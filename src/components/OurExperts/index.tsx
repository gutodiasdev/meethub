
import { Flex, Heading, Text, SimpleGrid, Stack, Box, Image } from '@chakra-ui/react'


export function OurExperts() {
  return (
    <Flex direction="column" align="center" mb={20}>
      <Heading as="h2" color="gray.900">Conheça alguns dos nossos especialistas</Heading>
      <Text color="gray.500" mt={3} fontSize="lg">Seja qual for seu desafio, nós conhecemos alguém que já alcançou o resultado que você está buscando.</Text>

      <SimpleGrid columns={4} w="100%" py={10} gap={5}>
        <Stack
          bg="white"
          boxShadow="xl"
          borderColor="gray.300"
          borderRadius="8px"
          align="center"
          p={8}
        >
          <Image
            src="/luciano-santos_meethub-400x400.jpg"
            boxSize="150px"
            borderRadius="80px"
            boxShadow="2xl"
          />
          <Heading size="md" color="gray.900" pt={8}>Luciano Santos</Heading>
          <Text color="gray.500" textAlign="center">Diretor de Vendas do Facebook</Text>
        </Stack>
        <Stack
          bg="white"
          boxShadow="xl"
          borderColor="gray.300"
          borderRadius="8px"
          align="center"
          p={8}
        >
          <Image
            src="/luciano-santos_meethub-400x400.jpg"
            boxSize="150px"
            borderRadius="80px"
            boxShadow="2xl"
          />
          <Heading size="md" color="gray.900" pt={8}>Luciano Santos</Heading>
          <Text color="gray.500" textAlign="center">Diretor de Vendas do Facebook</Text>
        </Stack>
        <Stack
          bg="white"
          boxShadow="xl"
          borderColor="gray.300"
          borderRadius="8px"
          align="center"
          p={8}
        >
          <Image
            src="/luciano-santos_meethub-400x400.jpg"
            boxSize="150px"
            borderRadius="80px"
            boxShadow="2xl"
          />
          <Heading size="md" color="gray.900" pt={8}>Luciano Santos</Heading>
          <Text color="gray.500" textAlign="center">Diretor de Vendas do Facebook</Text>
        </Stack>
        <Stack
          bg="white"
          boxShadow="xl"
          borderColor="gray.300"
          borderRadius="8px"
          align="center"
          p={8}
        >
          <Image
            src="/luciano-santos_meethub-400x400.jpg"
            boxSize="150px"
            borderRadius="80px"
            boxShadow="2xl"
          />
          <Heading size="md" color="gray.900" pt={8}>Luciano Santos</Heading>
          <Text color="gray.500" textAlign="center">Diretor de Vendas do Facebook</Text>
        </Stack>
      </SimpleGrid>

    </Flex >
  )
}