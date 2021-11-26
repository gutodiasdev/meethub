import { Flex, Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Input } from '../components/Forms/Input';

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  }

  const { errors, isSubmitting } = formState;

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="white"
        p="8"
        borderRadius={8}
        boxShadow="lg"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing="4">
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="8"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
