import { Heading, Flex, Grid, Box, Button, HStack, Textarea, FormControl, FormLabel, position, Skeleton } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'

import AppContainer from "../../components/AppContainer"
import { Input } from '../../components/Forms/Input'
import { WhoCanUse } from '../../components/WhoCanUse';
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), {
  loading: () => <Skeleton h={24} />,
  ssr: false
})

type UserData = {
  name?: string;
  email?: string;
  telephone?: string;
  image?: HTMLImageElement;
  position?: string;
  biography?: string;
}

export default function () {
  const { register, formState, handleSubmit } = useForm()
  const [textEditorData, setTextEditorData] = useState('')

  const handleTextEditor = (e, editor) => {
    const data = editor.getData()

    setTextEditorData(data)
  }

  const handleUserUpdate: SubmitHandler<UserData> = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      image: values.image,
      position: values.position,
      biography: textEditorData,
    }

    await api.put(`/users/`, data)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <AppContainer>
      <Flex w="100%" direction="column">
        <Heading>Meu perfil</Heading>
        <WhoCanUse roles={['user']}>
          <Box as="form" onSubmit={handleSubmit(handleUserUpdate)} py={6}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Input
                name="name"
                id="name"
                label="Nome"
                value="Augusto Dias"
                {...register('name')}
              />
              <Input
                name="email"
                id="email"
                label="E-mail"
                value="exemplo@meethub.com"
                {...register('email')}
              />
              <Input
                name="telephone"
                id="telephone"
                label="Telefone"
                value="91985281803"
                {...register('email')}
              />
            </Grid>
            <HStack my={6} w="100%" spacing={4} justify="right">
              <Button
                as="a"
                href="/app/meets"
                _hover={{
                  bg: 'red',
                  color: 'white',
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" colorScheme="blue">Salvar</Button>
            </HStack>
          </Box>
        </WhoCanUse>
        <WhoCanUse roles={['mentor']}>
          <Box as="form" onSubmit={handleSubmit(handleUserUpdate)} py={6}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Input
                name="image"
                id="image"
                type="file"
                label="Imagem do perfil"
                {...register('image')}
              />
              <Input
                name="name"
                id="name"
                label="Nome"
                value="Augusto Dias"
                {...register('name')}
              />
              <Input
                name="email"
                id="email"
                label="E-mail"
                value="exemplo@meethub.com"
                {...register('email')}
              />
              <Input
                name="telephone"
                id="telephone"
                label="Telefone"
                value="91985281803"
                {...register('telephone')}
              />
              <Input
                name="position"
                id="position"
                label="Cargo Atual"
                value="Dev Meethub"
                {...register('position')}
              />
            </Grid>
            <FormControl mt={4} >
              <FormLabel htmlFor="meetDetails" w="100%" >Biografia</FormLabel>
              <RichTextEditor handler={handleTextEditor} />
            </FormControl>
            <HStack my={6} w="100%" spacing={4} justify="right">
              <Button
                as="a"
                href="/app/meets"
                _hover={{
                  bg: 'red',
                  color: 'white',
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Box>
        </WhoCanUse>
      </Flex>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})