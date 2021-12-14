import { Box, Flex, Heading, Button, Icon, Text, Table, Thead, Th, Td, Tr, Tbody, Checkbox, Link, useBreakpointValue, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Divider, FormLabel, HStack, Input, Select, SimpleGrid, Textarea, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { RiAddLine, RiEditBoxLine } from 'react-icons/ri'
import { api } from '../../services/apiClient';
import * as yup from 'yup'
import { useMutation } from 'react-query';
import { queryClient } from '../../services/query/queryClient';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

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


export function UsersTable() {
  const [users, setUsers] = useState([])

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data)
    });
  }, [])

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

  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários

        </Heading>
          <Button
            as="a"
            href="/app/usuarios/novo"
            size="sm"
            fontSize="small"
            colorScheme="blue"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar novo
          </Button>
      </Flex>
      <Table >
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.600" width="8">
              <Checkbox colorScheme="blue" />
            </Th>
            <Th color="gray.400">Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            {isWideVersion && <Th width="8"></Th>}
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => {
            return (<Tr key={user.id}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="blue" />
              </Td>
              <Td>
                <Box>
                  <Box display="flex" alignItems="center">
                    <Link
                      color="blue.500"
                    >
                      <Text fontWeight="bold">{user.name}</Text>
                    </Link>
                  </Box>
                  <Text fontSize="small" color="gray.400">{user.email}</Text>
                </Box>
              </Td>
              {isWideVersion && <Td> {user.createdAt} </Td>}

              {isWideVersion &&
                <Td textAlign="end">
                  <Button
                    as="a"
                    href={`usuarios/${user.id}`}
                    size="sm"
                    fontSize="small"
                    leftIcon={<Icon as={RiEditBoxLine} />}
                    cursor="pointer"
                  >
                    Editar
                  </Button>
                </Td>
              }
            </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}
