import { Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Preferences() {
  const [preferences, setPreferences] = useState(['Uncategorized'])

  const categories = ['Vendas', 'Gestão', 'Marketing']
  
  useEffect(() => {
    const data = localStorage.getItem('meethub-preferences')
    if (data) {
      setPreferences(JSON.parse(data))
    }
  }, [])
  
  function handlePreferences(value) {
    setPreferences(old => [...old, value.target.value])
    localStorage.setItem('meethub-preferences', JSON.stringify(preferences))
  }


  return (
    <Flex maxW={600} mx="auto" alignItems="center" flexWrap="wrap">
      {categories.map((value, key) => {
        return (
          <Input
            as="button"
            mx='1'
            maxW={180}
            value={value}
            key={key}
            borderRadius="full"
            onClick={handlePreferences}
            flexBasis="auto"
          >
            {value}
          </Input>
        )
      })}
    </Flex>
  )
}