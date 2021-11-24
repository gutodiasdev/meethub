import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Augusto Dias</Text>
          <Text
            color="gray.400"
            fontSize="small"
          >
            augusto@meethub.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Augusto Dias" />
    </Flex>
  );
}