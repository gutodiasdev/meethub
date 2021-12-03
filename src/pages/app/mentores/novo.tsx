import { Box, Flex, Heading, Divider, VStack, SimpleGrid, FormLabel, Button, HStack, Textarea } from '@chakra-ui/react';
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Input } from '../../../components/Forms/Input';
import { api } from '../../../services/apiClient';
import AppContainer from '../../../components/AppContainer';
import Router from 'next/router';

type CreateMentorFormData = {
  name: string;
  email: string;
  password: string;
  telephone: string;
  position?: string;
  biography?: string;
}

const createMentorFormSchema = yup.object().shape({
  name: yup.string().required('Nome do usuário é obrigatório'),
  email: yup.string().required('E-mail do usuário é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  telephone: yup.string().required('Telefone é obrigatório').min(11, 'No mínimo 11 caracteres'),
  position: yup.string(),
  biography: yup.string()
})

export default function CreateMentor() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createMentorFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateMentor: SubmitHandler<CreateMentorFormData> = async (values) => {
    const response = await api.post('/admin/mentors', {
      name: values.name,
      email: values.email,
      password: values.password,
      position: values.position,
      telephone: values.telephone,
      biography: values.biography,
    })

    if (response.status === 201) {
      Router.push('/app/mentores')
    }
  }

  return (
    <AppContainer>
      <Flex w="100%" maxWidth={1480} mx="auto">
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="white"
          onSubmit={handleSubmit(handleCreateMentor)}
        >
          <Heading size="lg" fontWeight="normal">Criar mentor</Heading>
          <Divider my="6" borderColor="gray.200" />
          <VStack spacing="8">
            <SimpleGrid spacing={["6", "8"]} w="100%">
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
            <SimpleGrid spacing={["6", "8"]} w="100%">
              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Box>
              </Box>
            </SimpleGrid>
            <SimpleGrid spacing="8" w="100%">
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
            <VStack w="100%" justify="flex-start">
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
    </AppContainer>
  );
}

