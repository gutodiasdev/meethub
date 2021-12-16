import { Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCategories } from '../../services/hooks/categories/useCategories'

export default function Preferences() {
  const [preferences, setPreferences] = useState([])

  const { data, isLoading } = useCategories()

  const categories = ['Vendas', 'Gestão', 'Marketing']

  function handlePreferences(value) {
    setPreferences(old => [...old, value.target.value])
    localStorage.setItem('meethub.my.preferences', JSON.stringify(preferences))
  }

  useEffect(() => {
    const data = localStorage.getItem('meethub.my.preferences')
    if (data) {
      setPreferences(Array(data));
    }
  }, [])

  return (
    <Flex maxW={600} mx="auto" alignItems="center" flexWrap="wrap">
      {isLoading ? (
        <Spinner />
      ): (
        data.map(category => {
          return (
            <Input
              as="button"
              mx='1'
              w={150}
              value={category.name}
              key={category.id}
              borderRadius="full"
              onClick={handlePreferences}
              flexBasis="auto"
            >
              {category.name}
            </Input>
          )
        })
      )}
      {preferences.map(single => {
        return <Text mx={2}>{single}</Text>
      })}
    </Flex>
  )
}