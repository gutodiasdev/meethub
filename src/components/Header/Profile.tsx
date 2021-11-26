import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
  userEmail: string;
}

export function Profile({ showProfileData = true, userEmail }: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Você está logado</Text>
          <Text
            color="gray.400"
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