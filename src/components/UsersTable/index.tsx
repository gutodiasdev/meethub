import { Box, Flex, Heading, Spinner, Button, Icon, Text, Table, Thead, Th, Td, Tr, Tbody, Checkbox, Link, useBreakpointValue } from '@chakra-ui/react'
import NextLink from "next/link"
import { useEffect, useState } from 'react';
import { RiAddLine, RiEditBoxLine } from 'react-icons/ri'
import { api } from '../../services/apiClient';

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


  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários

        </Heading>
        <NextLink href="/app/usuarios/novo" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="small"
            colorScheme="blue"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar novo
          </Button>
        </NextLink>
      </Flex>
      <Table colorScheme="blackAlpha">
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
