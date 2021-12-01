import { Flex, Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { AuthContext } from '../../contexts/AuthContext';
import { Input } from './Input';

type SignUpFormData = {
  email: string;
  password: string;
  telephone: string;
}

const signupFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório.').email('Digite um email válido'),
  password: yup.string().required('Senha é obrigatória.'),
  telephone: yup.string().required('Telefone é obrigatório.'),
})

export function UserRegisterForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signupFormSchema)
  });
  const { signUp } = useContext(AuthContext);

  const handleSignUp: SubmitHandler<SignUpFormData> = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      telephone: values.telephone,
    }

    signUp(data);
  }

  const { errors } = formState;

  return (
    <Flex
      as="form"
      direction="column"
      onSubmit={handleSubmit(handleSignUp)}
      w={450}
      m="auto"
      p="8"
      borderRadius="16px"
      boxShadow="lg"
    >
      <Stack spacing="4">
        <Input
          type="email"
          name="email"
          label="E-mail"
          error={errors.email}
          {...register}
        />
        <Input
          type="telephone"
          name="telephone"
          label="Telefone"
          error={errors.telephone}
          {...register}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          error={errors.password}
          {...register}
        />
        <Button
          type="submit"
          colorScheme="blue"
          h={12}
          isLoading={formState.isSubmitting}
        >
          Cadastrar</Button>
      </Stack>
    </Flex>
  )
}
