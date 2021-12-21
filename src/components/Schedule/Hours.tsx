import { Box, Heading, useBoolean } from '@chakra-ui/react'
import React, { useState } from 'react'

function Hours({ hour }) {
  const [isDayName, setIsDayName] = useState(hour)
  const [isSelected, setIsSelected] = useBoolean(false)

  function handleSelected(data) {
    if (!isSelected) {
      setIsSelected.on()
      console.log(`Add hour ${hour}`)
    }
    if (isSelected) {
      setIsSelected.off()
      console.log(`Remove hour ${hour}`)
    }
  }

  return (
    <Box
      as='button'
      onClick={handleSelected}
      bg={isSelected ? 'blue.500' : null}
      value={hour}
      border='1px'
      borderRadius='4px'
      borderColor='gray.300'
      textAlign='center'
      p='4'
    >
      <Heading
        size='md'
        color={isSelected ? 'white' : 'gray.600'}
      >
        {hour}
      </Heading>
    </Box>
  )
}

export { Hours }
