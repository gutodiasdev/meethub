import { Grid, Flex, Heading, Text, Input, Icon, Image } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function Hero() {
  return (
    <Grid templateColumns="2fr 1fr" mt={16}>
      <Flex direction="column">
        <Heading size="2xl" color="gray.900" as="h1">Temos um especialista que já chegou onde você quer chegar.</Heading>
        <Heading size="2xl" color="blue.500" mt={2} >Faça um meet e antecipe o seu resultado.</Heading>
        <Text fontSize="xl" color="gray.600" mr={56} my={5} >Pesquise através de palavras-chave como um de nossos especialistas irão te ajudar nos seus desafios.</Text>
      </Flex>
      <Flex>
        <Image objectFit="cover" src="/banner-especialistas.png" />
      </Flex>
      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        maxWidth={600}
        alignSelf="center"
        color="gray.900"
        position="relative"
        bgColor="gray.100"
        borderRadius="full"
      >
        <Input
          color="gray.900"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{
            color: 'gray.900'
          }}
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
    </Grid >
  )
}