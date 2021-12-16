import { Stack, Button, Heading, HStack, Flex, Text, Link } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react'
import Image from 'next/image'
import * as yup from 'yup';
const { yupResolver } = require('@hookform/resolvers/yup')
import { Input } from '../../components/Forms/Input';
import { AuthContext } from '../../contexts/AuthContext';

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

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    signUp(values);
  }

  return (
    <Flex
      m="auto"
      h="100vh"
      direction="column"
      justify="center"
      as="form"
      onSubmit={handleSubmit(handleCreateUser)}
      maxWidth={550}
    >
      <Link href="/" maxW={100} mx="auto">
        <Image src="/meethub-logo.svg" width={100} height={20}  />
      </Link>
      <Heading size="md" mt={8} color="gray.700">Registrar-se</Heading>
      <Text pr={24} color="gray.500" mt={1}>
        Crie sua conta e agende um conversar com os melhores especialistas do Brasil
      </Text>
      <Stack
  

        py={8}
        w="100%"
      >
        <HStack spacing={6}>
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
        </HStack>
        <HStack spacing={6}>
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
        </HStack>
      </Stack>
      <Flex w="100%" direction="column">
        <Button
          letterSpacing={1}
          type="submit"
          colorScheme="blue"
          h={12}
          isLoading={isSubmitting}
        >
          Criar conta
        </Button>
        <Text display="flex" mt={6}>Você já tem uma conta?<Link  color="blue.600" ml={1}>Fazer login</Link></Text>
      </Flex>
    </Flex>
  )
}
