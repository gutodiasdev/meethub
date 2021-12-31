import { Box, Flex, Heading, VStack, SimpleGrid, FormLabel, Button, HStack, FormControl, Select, Text, Skeleton, GridItem } from '@chakra-ui/react';
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
const { yupResolver } = require('@hookform/resolvers/yup')
import Router from 'next/router';
import { useContext, useState } from 'react'
import dynamic from 'next/dynamic'

import { Input } from '../../../components/Forms/Input';
import { api } from '../../../services/apiClient';
import AppContainer from '../../../components/AppContainer';
import { AuthContext } from '../../../contexts/AuthContext';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { setupAPIClient } from '../../../services/api';
import { useCategories } from '../../../services/hooks/categories/useCategories';
import { FileInputMeet } from '../../../components/Forms/FileInputMeet';

const RichTextEditor = dynamic(() => import('../../../components/RichTextEditor'), {
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

const createMeetFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  meetDetails: yup.string(),
  price: yup.number().required('Preço é obrigatório'),
})

export default function MentorMeetCriation() {
  const { data, isLoading, error } = useCategories()
  const [textEditorData, setTextEditorData] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [localimageUrl, setLocalImageUrl] = useState('')

  const { user } = useContext(AuthContext)

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

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, trigger } = useForm({
    resolver: yupResolver(createMeetFormSchema)
  })

  const handleTextEditor = (e, editor) => {
    const data = editor.getData()

    setTextEditorData(data)
  }

  const handleCreateMentor: SubmitHandler<CreateMeetFormData> = async (values) => {

    const response = await api.post('/meets', {
      name: values.name,
      image: imageUrl,
      meetDetails: textEditorData,
      price: values.price,
      categoryId: values.categoryId,
      mentorId: user.id,
    })

    if (response.status === 201) {
      Router.push('/app/meets')
    }

  }

  return (
    <AppContainer>
      <Box
        as="form"
        flex="1"
        boxShadow='md'
        p='6'
        borderRadius="8"
        bg="white"
        onSubmit={handleSubmit(handleCreateMentor)}
      >
        <Heading
          size="lg"
          fontWeight="normal"
          mb="4"
          color='gray.600'
        >
          Criar meet
        </Heading>
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
            <Link href="/usuarios" passHref>
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
    </AppContainer>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const reponse = await apiClient.get('/me')

  return {
    props: {}
  }
})
