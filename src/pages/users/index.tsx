import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react';
import { RiAddLine, RiEditBoxLine } from 'react-icons/ri';
import Link from "next/link";

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from '../../services/hooks/users/useUsers';

export default function UserList() {

  const { data, isLoading, isFetching, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="white" p="8" shadow="lg">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
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
                  {data.map(user => {
                    return (<Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="blue" />
                      </Td>
                      <Td>
                        <Box>
                          <Box display="flex" alignItems="center">
                            <Text fontWeight="bold">{user.name}</Text>
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
              <Pagination />
            </>
          )}

        </Box>
      </Flex >
    </Box >
  );
}