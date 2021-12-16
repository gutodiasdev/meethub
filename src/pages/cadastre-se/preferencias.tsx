import { Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function Preferences() {
  const [preferences, setPreferences] = useState([''])

  const categories = ['Vendas', 'Gestão', 'Marketing']

  function handlePreferences(value) {
    setPreferences(old => [...old, value.target.value])
  }
  console.log(preferences)

  return ( 
    <Flex maxW={550} direction="column">
      {categories.map((value, key) => {
        return (
          <Input 
            as="button"
            value={value} 
            key={key} 
            borderRadius="full"
            onClick={handlePreferences}
          >
            {value}
          </Input>
        )
      })}
    </Flex>
  )
}