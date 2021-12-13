import { Center, Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react'
import * as yup from 'yup';
const { yupResolver } = require('@hookform/resolvers/yup')
import { Input } from '../components/Forms/Input';
import { AuthContext } from '../contexts/AuthContext';

type CreateUserFormData = {
  email: string;
  password: string;
  telephone: string;
}

const createUserFormSchema = yup.object({
  email: yup.string().required('E-mail é obrigatório.').email('Digite um email válido'),
  password: yup.string().required('Senha é obrigatória.').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password'),
  ], 'As senhas precisam ser iguais'),
  telephone: yup.string().required('Telefone é obrigatório.'),
})

export default function UserRegisterForm() {
  const { signUp } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    signUp(values);
  }

  const { errors } = formState;

  return (
    <Center
      m="auto"
      h="100vh"
    >
      <Stack
        spacing="4"
        maxW={450}
        as="form"
        onSubmit={handleSubmit(handleCreateUser)}
        borderRadius="16px"
        boxShadow="lg"
        p="8"
        w="100%"
      >
        <Input
          type="email"
          name="email"
          label="E-mail"
          size="md"
          error={errors.email}
          {...register('email')}
        />
        <Input
          type="telephone"
          name="telephone"
          label="Telefone"
          size="md"
          error={errors.telephone}
          {...register('telephone')}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          size="md"
          error={errors.password}
          {...register('password')}
        />
        <Input
          type="password"
          name="password"
          label="Confirme a senha"
          size="md"
          error={errors.password_confirmation}
          {...register('password_confirmation')}
        />
        <Button
          fontWeight="normal"
          type="submit"
          colorScheme="blue"
          h={12}
          isLoading={formState.isSubmitting}
        >
          Cadastrar</Button>
      </Stack>
    </Center>
  )
}
