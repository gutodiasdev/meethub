import { Box, Heading, useBoolean } from "@chakra-ui/react";
import { useState } from "react";

type DayofWeekParams = {
  dayName: string
  dayValue: number
}

export function DayOfWeek({ dayName, dayValue }: DayofWeekParams) {
  const [isDayName, setIsDayName] = useState(dayName)
  const [isSelected, setIsSelected] = useBoolean(false)

  function handleSelected(data) {
    if (!isSelected) {
      setIsSelected.on()
      console.log(`Add day ${isDayName} with value ${dayValue}`)
    }
    if (isSelected) {
      setIsSelected.off()
      console.log(`Remove day ${isDayName} with value ${dayValue}`)
    }
  }

  return (
    <Box
      as='button'
      onClick={handleSelected}
      bg={isSelected ? 'blue.500' : null}
      value={dayValue}
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
        {dayName}
      </Heading>
    </Box>
  )
}
