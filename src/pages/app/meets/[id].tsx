import {
  Box,
  Heading,
  Flex,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Button,
  Image,
  Avatar,
  Text,
  Spinner,
  useDisclosure,
  Skeleton,
  Input,
  useToast,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import NextLink from 'next/link'
import { useForm } from 'react-hook-form';
import { RiStarLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';

import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { api } from '../../../services/apiClient';
import { WhoCanUse } from '../../../components/WhoCanUse';
import { EditMeetModal } from '../../../components/Modals/EditMeetModal'
import { formatCurrency } from '../../../utils/formatCurrency'


const RichTextEditor = dynamic(() => import('../../../components/RichTextEditor'), {
  loading: () => <Skeleton h={24} />,
  ssr: false
})

const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);
  const [textEditorData, setTextEditorData] = useState('')
  const [isValue, setIsValue] = useState('1')
  const { onOpen, isOpen, onClose } = useDisclosure()
  const mentorId = meets.members[0].userId

  const toast = useToast()

  const { data, isLoading } = useQuery('mentor', async () => {
    const response = await api.get(`mentors/${mentorId}`)

    const mentor = response.data.map(info => {
      return {
        id: info.id,
        name: info.name,
        position: info.position,
        biography: info.biography,
      }
    })

    return mentor

  }, {
    staleTime: 1000 * 60 * 15
  })

  const handleTextEditor = (e, editor) => {
    const data = editor.getData()

    setTextEditorData(data)
  }

  const { register, formState: { isSubmitting, errors }, handleSubmit } = useForm()

  const handleReviewSubmit = async (value) => {
    try {
      await api.post('/meets/reviews', {
        meetId: value.meetId,
        description: textEditorData,
        rating: isValue,
      })
      toast({
        status: 'success',
        title: 'Avaliação enviada',
        description: 'Sua avaliação foi enviada com sucesso'
      })
    } catch (e) {
      toast({
        status: 'error',
        title: 'Algo de errado',
        description: 'Desculpe, algo deu errado durante o envio de sua avaliação'
      })
    } finally {
      setTextEditorData('')
    }
  }

  return (
    <AppContainer>
      <Flex
        bg="white"
        boxShadow='base'
        borderRadius="lg"
        width="100%"
        p="8"
      >
        <Box
          flex="1"
          columnSpan={4}
          direction="column"
          h="100%"
        >
          <Flex justify="space-between">
            <Flex mr={4}>
              {meet.categories.map((key, index) => {
                return (
                  <Tag mr={4} borderRadius='full' size="lg" key={index}>{key.name}</Tag>
                )
              })}
            </Flex>
            <Flex>
              <Text fontSize="2xl">{formatCurrency(Number(meet.price))}</Text>
            </Flex>
          </Flex>
          <Image src={meets.image} alt={meets.name} borderRadius={8} my={8} maxH={56} w="100%" />
          <Heading
            size="lg"
            mt="2"
            mb="2"
          >
            {meets.name}</Heading>
          <Box color="gray.500" fontSize="1.2rem">
            {ReactHtmlParser(meets.meetDetails)}
          </Box>
        </Box>
      </Flex>
      <Flex width="100%" justify="flex-end">
        <WhoCanUse roles={['mentor']} >
          <Button
            variant='outline'
            mt={4}
            href={`agendar/${meets.id}`}
            colorScheme="blue"
            size="lg"
            mr={4}
            onClick={() => onOpen()}
          >
            Editar meet
          </Button>
        </WhoCanUse>
        <NextLink
          href={`agendar/${meets.id}`}
          passHref
        >
          <Button
            as="a"
            mt={4}
            colorScheme="blue"
            size="lg"
          >
            Agendar um meet
          </Button>
        </NextLink>
      </Flex>
      <Flex width="100%" pt="4" mb={48}>
        <Tabs variant="enclosed" width="100%" >
          <TabList>
            <Tab>Agenda</Tab>
            <Tab>Reviews</Tab>
            <Tab>Sobre o especialista</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              <Box w='100%' as='form' textAlign='right' >
                <Box w='100%' textAlign='left'>
                  <Heading size='sm' as='h3' my='4'>Envie seu review</Heading>
                  <RadioGroup onChange={setIsValue} value={isValue} my='4'>
                    <Stack direction='row'>
                      <Radio value='1'><Flex align='center'>1 <RiStarLine /></Flex></Radio>
                      <Radio value='2'><Flex align='center'>2 <RiStarLine /></Flex></Radio>
                      <Radio value='3'><Flex align='center'>3 <RiStarLine /></Flex></Radio>
                      <Radio value='4'><Flex align='center'>4 <RiStarLine /></Flex></Radio>
                      <Radio value='5'><Flex align='center'>5 <RiStarLine /></Flex></Radio>
                    </Stack>
                  </RadioGroup>
                  <RichTextEditor handler={handleTextEditor} />
                </Box>
                <Input name='meetId' display='none' value={meet.id} {...register('meetId')} />
                <Button
                  type='submit'
                  colorScheme='blue'
                  variant='outline'
                  mt='4'
                  onClick={handleSubmit(handleReviewSubmit)}
                >
                  Enviar review
                </Button>
              </Box>
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <Spinner />
              ) : (
                <Flex direction="column" w="100%">
                  {data.map(mentor => {
                    return (
                      <>
                        <Flex
                          key={mentor.id}
                          border="1px"
                          borderColor="gray.200"
                          borderRadius="8px"
                          maxHeight="250px"
                          p={6}
                          my={4}
                        >
                          <Avatar size="xl" src={mentor.image} name={mentor.name} />
                          <Box ml={6}>
                            <Heading size="md">{mentor.name}</Heading>
                            <Text>{mentor.position}</Text>
                          </Box>
                        </Flex>
                        <Text>
                          {mentor.biography}
                        </Text>
                      </>
                    )
                  })}
                </Flex>
              )}

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <EditMeetModal isOpen={isOpen} onClose={onClose} meetId={meets.id} />
    </AppContainer >
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${ctx.query.id}`);
  console.log(response.data)

  return {
    props: {
      meet: response.data,
    }
  }
})

export default Meet