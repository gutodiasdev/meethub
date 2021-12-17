import { useEffect, useState } from "react";
import { Flex, Heading, Button, Text, Box, Center, Spinner, useBoolean } from "@chakra-ui/react";
import { RiArrowRightSLine } from 'react-icons/ri'
import { useCategories } from '../../services/hooks/categories/useCategories'
import { CategoryButton } from "../../components/CategoryButton";

export default function Preferences() {
  const { data, isLoading } = useCategories()
  const [preferences, setPreferences] = useState([])
  const [buttonStyle, setButtonStyle] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('meethub-preferences')
    if (data) {
      setPreferences(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('meethub-preferences', JSON.stringify(preferences))
  })

  function handlePreferences(categoryId) {
    setPreferences(old => [...old, categoryId]);
  }

  return (
    <Flex maxW={600} h="100vh" py={32} justify="space-between" mx="auto" direction="column">
      <Box>
        <Heading as="h2" color="gray.700" size="md">Escolha os assuntos que você mais se identifica</Heading>
        <Text color="gray.500">Para melhorar sua experiência na Meethub.</Text>
      </Box>
      <Flex justify="center" textAlign="center" flexWrap="wrap" minW={300}>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          data.map(category => {
            return (
              <Box onClick={() => handlePreferences(category.id)} >
                <CategoryButton
                  key={category.id}
                  value={category.name}
                  name={category.name}
                />
              </Box>
            )
          })
        )}
      </Flex>
      <Flex w="100%" justify="space-between" alignItems="center">
        <Button variant="outline" borderRadius="full">
          Pular
        </Button>
        <Button
          borderRadius="full"
          size="lg"
          rightIcon={<RiArrowRightSLine />}
          _hover={{ bg: 'blue.500', color: 'white' }}
          bg={buttonStyle ? 'blue.500' : ''}
          color={buttonStyle ? 'white' : ''}
        >
          Finalizar
        </Button>
      </Flex>
    </Flex>
  )
}