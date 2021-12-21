import { Box, Heading, useBoolean } from "@chakra-ui/react";

type DayofWeekParams = {
  dayName: string
}

export function DayOfWeek({ dayName }: DayofWeekParams) {
  // const [isSelected, setIsSelected] = useState(false)
  const [isSelected, setIsSelected] = useBoolean(false)

  function handleSelected() {
    setIsSelected.toggle()
  }

  return (
    <Box
      as='button'
      onClick={handleSelected}
      bg={isSelected ? 'blue.500' : null}
      value='0'
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