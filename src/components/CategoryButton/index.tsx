import { Button as ChakraButton, ButtonProps, useBoolean } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface CategoryButtonProps extends ButtonProps {
  name: string;
  value: string;
}

const ButtomBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({name, value, ...rest }, ref) => {

  const [flag, setFlag] = useBoolean()

  function handleButtonClickedStyle() {
    setFlag.toggle()
  }

  return (
    <ChakraButton
      mx={2}
      my={2}
      maxW={180}
      flexBasis="auto"
      px={8}
      py={4}
      borderRadius="full"
      fontSize="xl"
      bg={flag ? 'blue.500': null}
      color={flag ? 'white': null}
      name={name}
      value={value}
      ref={ref}
      {...rest}
      onClick={handleButtonClickedStyle}
    >
      {name}
    </ChakraButton>
  )
}

export const CategoryButton = forwardRef(ButtomBase)

