import { Flex, Box, Text, Avatar, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
  userEmail?: string;
}

export function Profile({ showProfileData = true, userEmail }: ProfileProps) {

  const { signOut } = useContext(AuthContext);

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
          <Button onClick={signOut}>Sair</Button>
        </Box>
      )}

      <Avatar size="md" name="Augusto Dias" />
    </Flex>
  );
}