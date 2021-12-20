import { Flex, Input, Icon, Box } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

type SearchPropsParams = {
  onChange: () => void
  name: string
}

export function Search({ onChange, name }: SearchPropsParams) {

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
          name={name}
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{
            color: 'gray.900'
          }}
          onChange={onChange}
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
    </Box>
  );
}
