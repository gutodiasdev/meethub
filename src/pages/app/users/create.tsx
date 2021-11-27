import { Box, Flex, Heading, Divider, VStack, SimpleGrid, Select, FormLabel, Button, HStack, Textarea } from '@chakra-ui/react';
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { Input } from '../../../components/Forms/Input';
import { queryClient } from '../../../services/query/queryClient';
import { api } from '../../../services/apiClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
  position?: string;
  biography?: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome do usuário é obrigatório'),
  email: yup.string().required('E-mail do usuário é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  telephone: yup.string().required('Telefone é obrigatório').min(11, 'No mínimo 11 caracteres'),
  role: yup.string().required('Tipo de usuário é obrigatório'),
  position: yup.string(),
  biography: yup.string()
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('/users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="white"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.200" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                id="name"
                name="name"
                type="text"
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />
              <Input
                id="email"
                name="email"
                label="E-mail"
                type="email"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Box>
                <FormLabel>Tipo de usuário</FormLabel>
                <Select
                  variant="filled"
                  h={12}
                  name="role"
                  id="role"
                  {...register('role')}
                  error={errors.role}
                >
                  <option value="USER">Assinante</option>
                  <option value="MENTOR">Mentor</option>
                  <option value="ADMIN">Administrador</option>
                </Select>
              </Box>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Box>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  label="Cargo atual"
                  obs="(Importante se for Mentor)"
                  {...register('position')}
                  error={errors.position}
                />
              </Box>
              <Box>
                <Input
                  id="telephone"
                  name="telephone"
                  type="text"
                  label="Telefone"
                  {...register('telephone')}
                  error={errors.telephone}
                />
              </Box>
            </SimpleGrid>
            <VStack minChildWidth="240px" w="100%" justify="flex-start">
              <FormLabel htmlFor="biography">Bio do mentor</FormLabel>
              <Textarea
                focusBorderColor="blue.500"
                bgColor="gray.100"
                variant="filled"
                h={40}
                _hover={{
                  bgColor: 'gray.50'
                }}
                id="biography"
                name="biography"
                type="text"
                obs="(Importante se for Mentor)"
                {...register('biography')}
                error={errors.biography}
              />
            </VStack>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button
                  colorScheme="blackAlpha"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex >
    </Box >
  );
}

