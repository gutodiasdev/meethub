import { Flex, Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Input } from './Input';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type CreateUserFormData = {
  email: string;
  password: string;
  telephone: string;
}

const createUserFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório.').email('Digite um email válido'),
  password: yup.string().required('Senha é obrigatória.').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password'),
  ], 'As senhas precisam ser iguais'),
  telephone: yup.string().required('Telefone é obrigatório.'),
})

export function UserRegisterForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const {signUp} = useContext(AuthContext)

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      telephone: values.telephone,
    }

    console.log(values);

    await signUp(data);
  }

  const { errors } = formState;

  return (
    <Flex

      direction="column"
      w={450}
      m="auto"
      p="8"
      borderRadius="16px"
      boxShadow="lg"
    >
      <Stack
        spacing="4"
        as="form"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Input
          type="email"
          name="email"
          label="E-mail"
          size="md"
          error={errors.email}
          {...register}
        />
        <Input
          type="telephone"
          name="telephone"
          label="Telefone"
          size="md"
          error={errors.telephone}
          {...register}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          size="md"
          error={errors.password}
          {...register}
        />
        <Input
          type="password"
          name="password"
          label="Confirme a senha"
          size="md"
          error={errors.password_confirmation}
          {...register}
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
    </Flex>
  )
}
