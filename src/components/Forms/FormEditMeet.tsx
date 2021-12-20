import { Box, Flex, VStack, SimpleGrid, FormLabel, Button, HStack, FormControl, Select, Text, Skeleton, GridItem, Spinner, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const { yupResolver } = require('@hookform/resolvers/yup')
import { useContext, useState } from 'react'
import dynamic from 'next/dynamic'

import { Input } from './Input';
import { AuthContext } from '../../contexts/AuthContext';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { setupAPIClient } from '../../services/api';
import { useCategories } from '../../services/hooks/categories/useCategories';
import { FileInputMeet } from '../../components/Forms/FileInputMeet';
import { useSingleMeet } from '../../services/hooks/meets/useMeets'
import { useMutation } from 'react-query';
import { api } from '../../services/apiClient';

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), {
  loading: () => <Skeleton h={24} />,
  ssr: false
})

type CreateMeetFormData = {
  name: string;
  price: string;
  image: string;
  mentorEmail: string;
  meetDetails: string;
  categoryId: string;
}

interface FormEditMeetProps {
  closeModal: () => void;
  meetId: string;
}

type Category = {
  name: string;
}

type UpdateUserData = {
  meetId: string
  name?: string,
  price?: string,
  categories?: Category[],
}

export default function FormEditMeet({ closeModal, meetId }: FormEditMeetProps) {
  const { data, isLoading, error } = useCategories()
  const [textEditorData, setTextEditorData] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [localimageUrl, setLocalImageUrl] = useState('')

  const meet = useSingleMeet(meetId)
  const mutation = useMutation(async (data: UpdateUserData) => {
    await api.put('/meets', {
      ...data,
      image: imageUrl,
      meetDetails: textEditorData,
    })
  })

  const { user } = useContext(AuthContext)
  const toast = useToast()

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

  const handleTextEditor = (e, editor) => {
    const data = editor.getData()

    setTextEditorData(data)
  }

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, trigger, reset } = useForm()

  const onSubmit = async (data: UpdateUserData): Promise<void> => {
    try {
      await mutation.mutateAsync(data)
      toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.',
        status: 'success',
      });
    } catch {
      toast({
        title: 'Falha na atualização',
        description: 'Ocorreu um erro ao tentar atualizar o meet',
        status: 'error',
      });
    } finally {
      reset()
      setImageUrl('')
      setLocalImageUrl('')
      closeModal()
    }
  }

  return (
    <Flex
      w="100%"
      maxWidth={1480}
      mx="auto"
      mb={16}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {meet.isLoading ? (
        <Flex w="100%" h={48} align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <Box
          flex="1"
          borderRadius="8"
          bg="white"
        >
          <Input id="meetId" name="meetId" value={meetId} display="none" {...register('meetId')} />
          <Input id="userId" name="userId" value={user.id} display="none" {...register('userId')} />
          <VStack spacing="4">
            <FileInputMeet
              name="image"
              setImageUrl={setImageUrl}
              localImageUrl={localimageUrl}
              setLocalImageUrl={setLocalImageUrl}
              setError={setError}
              trigger={trigger}
              {...register('image', formValidations.image)}
            />
            <SimpleGrid spacing={["6", "8"]} w="100%" templateColumns='repeat(12, 1fr)'>
              <GridItem colSpan={10}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Título do meet"
                  placeholder={meet.data.name}
                  {...register('name')}
                  error={errors.name}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Input
                  leftAddon='R$'
                  id="price"
                  name="price"
                  type="number"
                  label="Preço"
                  textAlign='right'
                  placeholder={meet.data.price}
                  {...register('price')}
                  error={errors.price}
                />
              </GridItem>
            </SimpleGrid>
            <SimpleGrid spacing={["6", "8"]} w="100%" templateColumns="repeat(2, 1fr)">
              <Box>
                <FormLabel htmlFor="categoryId" >Categoria do Meet</FormLabel>

                {isLoading ? (

                  <Flex direction="column">
                    <Skeleton h={12} />
                  </Flex>

                ) : error ? (
                  <Flex justify="center">
                    <Text>Erro ao carregar as categorias</Text>
                  </Flex>

                ) : (

                  <FormControl>
                    <Select
                      name="categoryId"
                      id="categoryId"
                      border="1px"
                      borderColor="gray.300"
                      height={10}
                      maxW={300}
                      {...register('categoryId')}
                    >
                      {
                        data.map(category => {
                          return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                )}
              </Box>
              <Box></Box>
            </SimpleGrid>
            <VStack w="100%" justify="flex-start">
              <FormControl>
                <FormLabel htmlFor="meetDetails" w="100%" >Detalhes do meet</FormLabel>
                <RichTextEditor handler={handleTextEditor} />
              </FormControl>
            </VStack>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button
                onClick={closeModal}
                colorScheme="blackAlpha"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancelar
              </Button>
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
      )}
    </Flex >
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const reponse = await apiClient.get('/me')

  return {
    props: {}
  }
})
