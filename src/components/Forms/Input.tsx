import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Box,
  Text,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'
import {
  forwardRef,
  ForwardRefRenderFunction
} from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  obs?: string;
  error?: FieldError;
  leftAddon?: string;
  rightAddon?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name,
  leftAddon,
  rightAddon,
  label,
  obs,
  error = null
  , ...rest }
  , ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <Box display="flex">
        {!!label &&
          <FormLabel
            mt='4'
            color="gray.500"
            htmlFor={name}
            id={name + label}
          >
            {label}
          </FormLabel>}
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
      <InputGroup>
        {leftAddon ? <InputLeftAddon children={leftAddon} size="lg" /> : null}
        <ChakraInput
          name={name}
          id={name}
          focusBorderColor="blue.500"
          border="1px"
          borderColor="gray.300"
          _hover={{
            bgColor: 'gray.50'
          }}
          ref={ref}
          {...rest}
        />
        {rightAddon ? <InputRightAddon children={rightAddon} /> : null}
      </InputGroup>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);