import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export function Search() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.900"
      position="relative"
      bgColor="gray.100"
      borderRadius="full"
    >
      <Input
        color="gray.900"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{
          color: 'gray.900'
        }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}