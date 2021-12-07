import { Flex, Input, Icon, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Select from 'react-select';
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { withSSRAuth } from "../../utils/withSSRAuth";

export function Search({category}) {
  // const [categories, setCategories] = useState(category);


  // function getCategories() {
    const info = category.map(cat => {
      return { value: cat.name , label: cat.name }
    })

  //   return info;
  // }

  return (
    <Box w="100%">
    <Flex
      as="label"
      flex="1"
      py="4"
      px={4}
      mb={6}
      maxWidth={400}
      alignSelf="center"
      color="gray.900"
      position="relative"
      border="1px"
      borderColor="gray.200"
      borderRadius="8px"
    >
      <Input
        color="gray.900"
        variant="unstyled"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{
          color: 'gray.900'
        }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
    <Select options={info} isMulti />
    </Box>
  );
}

export const  getServerSideProps = withSSRAuth( async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/category')


  return { 
    props: {
      category: response.data,
    }
  }
}) 