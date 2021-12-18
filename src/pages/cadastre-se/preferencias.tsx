import { FormEvent, useEffect, useState } from "react";
import { Flex, Heading, Button, Text, Box, Center, Spinner } from "@chakra-ui/react";
import { RiArrowRightSLine } from 'react-icons/ri'
import { useCategories } from '../../services/hooks/categories/useCategories'
import { CategoryButton } from "../../components/CategoryButton";
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useMutation } from "react-query";
import { api } from "../../services/apiClient";
import { SubmitHandler } from "react-hook-form";
import { setupAPIClient } from "../../services/api";
import Router from "next/router";

type UpdateData = {
  email: string;
  categoryId: string[];
}

export default function Preferences({ user }) {
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

  useEffect(() => {
    if (preferences.length >= 3) {
      setButtonStyle(true)
    }
  })

  function handlePreferences(categoryId) {
    if (!preferences.includes(categoryId)) {
      setPreferences(old => [...old, categoryId]);
    }
  }

  const handleUserPreferenceUpdate: SubmitHandler<UpdateData> = (values, e) => {
    e.preventDefault()

    preferences.forEach( async ( ) => {
      const response = await api.put('/users/userPreferences', {
        email: values.email,
        categoryId: values.categoryId,
      })
    })
  }

  return (
    <Flex as="form" maxW={600} h="100vh" py={32} justify="space-between" mx="auto" direction="column"
      onSubmit={(e) => { handleUserPreferenceUpdate({ email: user.id, categoryId: preferences }) }}
    >
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
              <Box key={category.id} onClick={() => handlePreferences(category.id)} >
                <CategoryButton
                  value={category.name}
                  name={category.name}
                />
              </Box>
            )
          })
        )}
      </Flex>
      <Flex w="100%" justify="space-between" alignItems="center">
        <Button variant="none" color="gray.400" _hover={{ variant: 'outline' }}>
          Pular
        </Button>
        <Button
          borderRadius="full"
          size="lg"
          rightIcon={<RiArrowRightSLine />}
          colorScheme={buttonStyle ? 'blue' : null}
          color={buttonStyle ? 'white' : ''}
          type="submit"
        >
          Finalizar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {
      user: response.data
    }
  }
})