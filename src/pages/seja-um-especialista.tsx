import { Flex, Grid, Box, Heading, Text, VStack, Button, Avatar, Stack, HStack, Image, SimpleGrid } from '@chakra-ui/react'
import { UserFooter } from '../components/UserFooter'
import { UserHeader } from '../components/UserHeader'

export default function SejaUmEspecialista() {
  return (
    <>
      <Flex
        direction="column"
        w={1280}
        maxW={1480}
        px="5"
        mx="auto"
      >
        <UserHeader />
        <Grid templateColumns="1fr 1fr" my="20">
          <Box>
            <Heading>Tudo que você precisa pra fazer seu conhecimento gerar transformação</Heading>
            <VStack spacing="4" my="4">
              <Text color="gray.600">
                Acreditamos na transformação do conhecimento, passado da forma genuína, olho no olho e sem enrolação. E se você também acredita, a gente vai se dar bem 😉
              </Text>
              <Text color="gray.600">
                Somos uma plataforma que vai te ajudar a monetizar seu conhecimento, organizar sua agenda e te posicionar no mercado e controlar tudo isso de forma simples.
              </Text>
            </VStack>
            <Button bg="blue.500" size="lg" color="white" fontWeight="md" left="0" my={4}>Seja um especialista, Agora!</Button>
          </Box>
          <Box>

          </Box>
        </Grid>

      </Flex>
      <Flex h="32" bg="gray.300" align="center" justify="center">
        <Heading fontSize="3xl">E não, você não precisa ser um guru da internet ou um empreendedor de palco.</Heading>
      </Flex>
      <Flex
        direction="column"
        w={1280}
        maxW={1480}
        py="5"
        px="5"
        mx="auto"
        align="center"
        justify="center"
      >
        <Box my="10">
          <Heading fontSize="xl" textAlign="center" color="blue.500" mx="24" >Se você possui expertise em alguma área e acredita que pode ajudar pessoas que estão passando pelo que você já passou e ainda ganhar dinheiro com isso, temos um lugar pra você na MeetHub.</Heading>

          <Heading fontSize="xl" textAlign="center" color="blue.500" mt="4" mx="24">Aqui você consegue listar suas mentorias para venda, com temas específicos, sejam elas individuais ou coletivas.E você não precisa saber tudo de marketing digital, ter uma audiência gigantesca, nem se preocupar com agenda!Criamos uma ferramenta que concentra tudo isso em uma só lugar!</Heading>
        </Box>
      </Flex>
      <Flex direction="column" align="center" mb={20} mx="24">
        <Heading as="h2" color="gray.900" fontSize="4xl">O que dizem nossos mentores</Heading>
        <Text textAlign="center" color="gray.600" fontSize="xl" mt="10">“Estou no meethub desde que ele foi criado, o que mais gosto da ferramenta é a possibilidade de, apesar de eu ter poucas horas por semana por ter um trabalho fixo, ainda assim abrir espaço para mentorar profissionais que buscam meus conselhos e dividir um pouco do que aprendi nesses 23 anos de estrada. Aqui, tive conversas transformadoras, ensinei, aprendi e fiz até amigos. O meethub muda vidas.”</Text>
        <HStack my="5">
          <Avatar src="/luciano-santos_meethub-400x400.jpg" />
          <Stack spacing="0">
            <Heading fontSize="sm" fontWeight="normal">Luciano Santos</Heading>
            <Text color="gray.500" fontWeight="thin">Diretor de vendas Facebook</Text>
          </Stack>
        </HStack>
        <Grid templateColumns="1fr 1fr" my="20" >
          <Flex justify="center" direction="column">
            <Heading>Um ecosistema pensado para facilitar e organizar seu processo de vendas de mentorias</Heading>
            <Text color="gray.600" mt="5" pr="10">
              Tudo em um só lugar, reunimos diversas ferramentas dentro de uma plataforma única. Aqui você vai encontrar tudo que você precisa para levar sua mentoria para o próximo nível.
            </Text>
          </Flex>
          <Box>
            <Image src="/notebook.png" />
          </Box>
        </Grid>
        <Flex direction="column" align="center" mb={20}>
          <Heading as="h2" color="gray.900" fontSize="5xl">Ajudamos sua empresa nas seguintes áreas</Heading>
          <SimpleGrid columns={5} w="100%" px={16} py={10} gap={5}>
            <Flex
              bg="gray.300"
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Heading p="4" fontSize="lg">Suporte 24h</Heading>
            </Flex>
            <Flex
              bg="gray.300"
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Heading p="4" fontSize="lg">Gateway de pagamento</Heading>
            </Flex>
            <Flex
              bg="gray.300"
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Heading p="4" fontSize="lg">Plataform de vídeo interna</Heading>
            </Flex>
            <Flex
              bg="gray.300"
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Heading p="4" fontSize="lg">Perfil do especialista com biografia</Heading>
            </Flex>
            <Flex
              bg="gray.300"
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Heading p="4" fontSize="lg">Facildiade de busca para sua auudiência</Heading>
            </Flex>
          </SimpleGrid>
          <Button bg="blue.500" size="lg" color="white" fontWeight="md" left="0" my={4}>Seja um especialista, Agora!</Button>
        </Flex>
        <Grid templateColumns="1fr 1fr" my="5" >
          <Flex justify="center" direction="column">
            <Heading fontSize="6xl">A excelência em Mentorias Online</Heading>
            <Text color="gray.600" mt="5" pr="10" fontSize="xl">
              A MeetHub é parceira da mais completa formação online para mentores que leva o seu conteúdo e suas vendas ao próximo nível.
            </Text>
          </Flex>
          <Box>
            <Image src="/meethub_mentor.png" />
          </Box>
        </Grid>

      </Flex>
      <Flex direction="column" align="center" my={20} bg="gray.50" py="32">
        <Heading as="h2" color="purple" fontSize="5xl">Conheça o Mentor Club</Heading>
        <Text textAlign="center" color="gray.600" fontSize="xl" mt="2">Uma formação para você criar faturamento consistente com Mentorias Online dominando esses 4 pilares:</Text>
        <SimpleGrid columns={2} px={32} py={10}>
          <HStack align="center" bg="white" p="10">
            <Text fontSize="5xl" color="purple">1</Text>
            <Flex direction="column" pl="5">
              <Heading fontSize="xl">Estruturar</Heading>
              <Text fontSize="md">seu conhecimento de forma profissional e chamativa</Text>
            </Flex>
          </HStack>
          <HStack align="center" bg="white" p="10">
            <Text fontSize="5xl" color="purple">2</Text>
            <Flex direction="column" pl="5">
              <Heading fontSize="xl">Atrair</Heading>
              <Text fontSize="md">clientes rapidamente com um funil de vendas 100% online</Text>
            </Flex>
          </HStack>
          <HStack align="center" bg="white" p="10">
            <Text fontSize="5xl" color="purple">3</Text>
            <Flex direction="column" pl="5">
              <Heading fontSize="xl">Executar</Heading>
              <Text fontSize="md">suas mentorias excelentes e gerar bons resultados aos clientes</Text>
            </Flex>
          </HStack>
          <HStack align="center" bg="white" p="10">
            <Text fontSize="5xl" color="purple">4</Text>
            <Flex direction="column" pl="5">
              <Heading fontSize="xl">Escalar</Heading>
              <Text fontSize="md">seus ganhos, com ticket mais alto e turmas mais lotadas</Text>
            </Flex>
          </HStack>
        </SimpleGrid>
      </Flex>
      <Flex
        direction="column"
        w={1280}
        maxW={1480}
        px="5"
      >
        <Flex my="5" E align="center">
          <Flex>
            <Image src="/mockup-circulo.png" />
          </Flex>
          <Flex direction="column">
            <Heading color="purple" textAlign="center" fontSize="2xl">Absolutamente tudo que você precisa, e muito mais:</Heading>
            <VStack boxShadow="xl" mt="6" bg="white" borderRadius="8px">
              <HStack align="center" borderRadius="8px" p="10">
                <Text fontSize="5xl" color="purple">+6</Text>
                <Flex direction="column" pl="5">
                  <Heading fontSize="xl">Escalar</Heading>
                  <Text fontSize="md">seus ganhos, com ticket mais alto e turmas mais lotadas</Text>
                </Flex>
              </HStack>
            </VStack>
            <VStack boxShadow="xl" mt="6" bg="white" borderRadius="8px" >
              <HStack align="center" p="10">
                <Text fontSize="5xl" color="purple">+2</Text>
                <Flex direction="column" pl="5">
                  <Heading fontSize="xl">Escalar</Heading>
                  <Text fontSize="md">seus ganhos, com ticket mais alto e turmas mais lotadas</Text>
                </Flex>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
        <Flex direction="column" align="center" my={20}>
          <Heading as="h2" color="gray.900" fontWeight="normal" fontSize="5xl">Aprenda mais nessa</Heading>
          <Heading as="h2" color="purple" fontSize="6xl">MasterClass 100% grátis</Heading>
          <SimpleGrid columns={6} w="100%" px={16} py={10} gap={5}>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/terceira-via.png" />
              <Heading p="4" fontSize="sm">Suporte 24h</Heading>
            </Flex>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/obesidade-mental.png" />
              <Heading p="4" fontSize="sm">Gateway de pagamento</Heading>
            </Flex>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/estruturacao.png" />
              <Heading p="4" fontSize="sm">Plataform de vídeo interna</Heading>
            </Flex>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/atracao-de-clientes.png" />
              <Heading p="4" fontSize="sm">Perfil do especialista com biografia</Heading>
            </Flex>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/execucao.png" />
              <Heading p="4" fontSize="sm">Facildiade de busca para sua auudiência</Heading>
            </Flex>
            <Flex
              boxShadow="lg"
              align="center"
              textAlign="center"
              justify="center"
              direction="column"
              borderRadius="8px"
            >
              <Image pt="4" src="/escala.png" />
              <Heading p="4" fontSize="sm">Facildiade de busca para sua auudiência</Heading>
            </Flex>
          </SimpleGrid>
          <Image src="/thumb-simplificado.png" my="5" />
          <Heading p="4" fontSize="6xl" my="5" color="blue.500">Faça parte do time MeetHub</Heading>
          <Button bg="blue.500" size="lg" color="white" fontWeight="md" left="0" my={4}>Seja um especialista, Agora!</Button>
        </Flex>
        <UserFooter />
      </Flex>
    </>
  )
}