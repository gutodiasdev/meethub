import { useEffect, useState } from "react";
import { Flex, Heading, Button, Text, Box, Center, Spinner } from "@chakra-ui/react";
import { RiArrowRightSLine } from 'react-icons/ri'
import { useCategories } from '../../services/hooks/categories/useCategories'

export default function Preferences() {
  const { data, isLoading } = useCategories()
  const [preferences, setPreferences] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('meethub-preferences')
    if (data) {
      setPreferences(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('meethub-preferences', JSON.stringify(preferences))
  })

  function handlePreferences(value) {
    setPreferences(old => [...old, value.target.value])
  }

  return (
    <Flex maxW={600} h="100vh" py={32} justify="space-between" mx="auto" direction="column">
      <Box>
        <Heading as="h2" color="gray.700" size="md">Escolha os assuntos que você mais se identifica</Heading>
        <Text color="gray.500">Para melhorar sua experiência na Meethub.</Text>
      </Box>
      <Flex justify="center" textAlign="center" flexWrap="wrap">
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          data.map(category => {
            return (
              <Button
                mx={2}
                my={2}
                variant="outline"
                colorScheme="gray"
                maxW={180}
                name={category.name}
                value={category.id}
                key={category.id}
                borderRadius="full"
                onClick={handlePreferences}
                flexBasis="auto"
                px={8}
                py={4}
                fontSize="xl"
              >
                {category.name}
              </Button>
            )
          })
        )}
      </Flex>
      <Flex w="100%" justify="space-between" alignItems="center">
        <Button variant="outline" borderRadius="full">
          Pular
        </Button>
        <Button borderRadius="full" size="lg" rightIcon={<RiArrowRightSLine />} _hover={{ bg: 'blue.500', color: 'white' }}>
          Finalizar
        </Button>
      </Flex>
    </Flex>
  )
}