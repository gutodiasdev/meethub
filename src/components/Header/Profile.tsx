import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
  userEmail?: string;
}

export function Profile({ showProfileData = true, userEmail }: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color="gray.400" fontSize="xs">Logado(a), como</Text>
          <Text
            fontSize="small"
          >
            {userEmail}
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Augusto Dias" />
    </Flex>
  );
}