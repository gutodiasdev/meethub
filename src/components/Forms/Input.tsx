import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, Box, Text, FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  obs?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, obs, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <Box display="flex">
        {!!label && <FormLabel color="gray.500" htmlFor={name} id={name + label}>{label}</FormLabel>}
        {!!obs &&
          <Text
            as="span"
            color="gray.400"
            fontSize="xs"
            mt="4px"
          >
            {obs}
          </Text>}
      </Box>
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="blue.500"
        _hover={{
          bgColor: 'gray.50'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);