import {
  Heading,
  Flex,
  Grid,
  Box,
  Button,
  FormControl,
  FormLabel,
  Skeleton,
  useToast
} from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

import AppContainer from "../../components/AppContainer"
import { Input } from '../../components/Forms/Input'
import { WhoCanUse } from '../../components/WhoCanUse';
import { api } from '../../services/apiClient';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { FileInput } from '../../components/Forms/FileInput'
import { useMutation } from 'react-query'
import { setupAPIClient } from '../../services/api';

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), {
  loading: () => <Skeleton h={24} />,
  ssr: false
})
interface NewImageData {
  url: string;
}

type UserData = {
  name?: string;
  email?: string;
  telephone?: string;
  position?: string;
}


export default function MyProfile({ me }) {
  const [textEditorData, setTextEditorData] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [localimageUrl, setLocalImageUrl] = useState('')
  const toast = useToast()

  const handleTextEditor = (editor) => {
    const data = editor.getData()

    setTextEditorData(data)
  }

  const acceptedFormatsRegex =
    /(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#](?:jpeg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g;

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: fileList =>
          fileList[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: fileList =>
          acceptedFormatsRegex.test(fileList[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    }
  };

  const mutation = useMutation(
    async ({ name, email, telephone, position }: UserData) => {
      await api.put('/users', {
        name: name,
        email: email,
        telephone: telephone,
        position: position,
        biography: textEditorData,
        image: imageUrl,
        id: me.id,
      })
    }
  )

  const { register, formState: { isSubmitting }, handleSubmit, reset, setError, trigger } = useForm()

  const onSubmit = async (values: UserData): Promise<void> => {
    try {
      await mutation.mutateAsync(values)
      toast({
        status: 'success',
        title: 'Perfil atualizado',
        description: 'Seu perfil foi atualizado...'
      })
    } catch {
      toast({
        status: 'error',
        title: 'Falha ao atualizar o perfil',
        description: 'Ocorreu um erro ao tentar atualizar o seu perfil...'
      })

    } finally {
      reset()
      setImageUrl('')
      setLocalImageUrl('')
    }

  }


  return (
    <AppContainer>
      <Box
        as="form"
        bg='white'
        p='6'
        borderRadius='md'
        boxShadow='md'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          size='md'
          color='gray.700'
        >
          Meu perfil
        </Heading>
        <WhoCanUse
          roles={['user']}
        >
          <Box
            py={6}
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
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
          </Box>
        </WhoCanUse>
        <WhoCanUse
          roles={['mentor']}
        >
          <Box
            py={6}
          >
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              <FileInput
                setImageUrl={setImageUrl}
                localImageUrl={localimageUrl}
                setLocalImageUrl={setLocalImageUrl}
                setError={setError}
                trigger={trigger}
                {...register('image', formValidations.image)}
              />
              <Box>
                <Input
                  name="name"
                  id="name"
                  label="Nome"
                  {...register('name')}
                />
                <Input
                  name="position"
                  id="position"
                  label="Cargo Atual"
                  {...register('position')}
                />
              </Box>
              <Input
                name="email"
                id="email"
                label="E-mail"
                {...register('email')}
              />
              <Input
                name="telephone"
                id="telephone"
                label="Telefone"
                {...register('telephone')}
              />

            </Grid>
            <FormControl
              mt={4}
            >
              <FormLabel
                htmlFor="meetDetails"
                w="100%"
              >
                Biografia
              </FormLabel>
              <RichTextEditor
                handler={handleTextEditor}
              />
            </FormControl>
          </Box>
        </WhoCanUse>
        <Flex
          w='100%'
          justify='flex-end'
        >
          <Button
            as="a"
            mx='4'
            href="/app/meets"
            _hover={{
              bg: 'red',
              color: 'white',
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </Flex>
      </Box>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {
      me: response.data,
    }
  }
})
