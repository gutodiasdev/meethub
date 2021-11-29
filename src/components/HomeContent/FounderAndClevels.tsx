import { Flex, Heading, SimpleGrid, Box } from '@chakra-ui/react'

export function FounderAndClevels() {
  return (
    <Flex
      h="80px"
      width="100%"
      my={32}
      align="center"
    >
      <Heading as="h2" w="400px" color="gray.900">Founders, Heads e C-Levels de empresas como</Heading>
      <SimpleGrid columns={5} pl={8} gap={5}>
        <Box w={150} h={150} bg="white" boxShadow="xl" borderRadius="8px"></Box>
        <Box w={150} h={150} bg="white" boxShadow="xl" borderRadius="8px"></Box>
        <Box w={150} h={150} bg="white" boxShadow="xl" borderRadius="8px"></Box>
        <Box w={150} h={150} bg="white" boxShadow="xl" borderRadius="8px"></Box>
        <Box w={150} h={150} bg="white" boxShadow="xl" borderRadius="8px"></Box>
      </SimpleGrid>
    </Flex>
  )
}