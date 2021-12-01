import { Box, Flex, Heading, Spinner, Button, Icon, Text, Table, Thead, Th, Td, Tr, Tbody, Checkbox, Link, useBreakpointValue } from '@chakra-ui/react'
import NextLink from "next/link"
import { useState } from 'react';
import { RiAddLine, RiEditBoxLine } from 'react-icons/ri'
import { api } from '../../services/apiClient';

import { useUsers } from '../../services/hooks/users/useUsers';
import { queryClient } from '../../services/query/queryClient';
import { Pagination } from '../Pagination';


export function UsersTable() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10
    })
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });


  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
          {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
        </Heading>

        <NextLink href="/users/create" passHref>
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

      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados dos usuários</Text>
        </Flex>
      ) : (
        <>
          <Pagination
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
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
              {data.users.map(user => {
                return (<Tr key={user.id}>
                  <Td px={["4", "4", "6"]}>
                    <Checkbox colorScheme="blue" />
                  </Td>
                  <Td>
                    <Box>
                      <Box display="flex" alignItems="center">
                        <Link
                          color="blue.500"
                          onMouseEnter={() => handlePrefetchUser(user.id)}
                        >
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>
                        <Box
                          as="span"
                          fontSize="10px"
                          bg={user.role == "Admin" ? "blue.500" : user.role == "Mentor" ? "yellow.400" : "gray.200"}
                          color={user.role == "Admin" ? "white" : user.role == "Mentor" ? "gray.700" : "gray.600"}
                          pt="1px"
                          pb="1px"
                          pr="8px"
                          pl="8px"
                          ml="2"
                          borderRadius="full"
                        >
                          {user.role}</Box>
                      </Box>
                      <Text fontSize="small" color="gray.400">{user.email}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td> {user.createdAt} </Td>}

                  {isWideVersion &&
                    <Td textAlign="end">
                      <Button
                        as="a"
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
          <Pagination
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </Box>
  )
}