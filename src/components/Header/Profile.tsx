import { Flex, Box, Text, Avatar, Button, Link } from "@chakra-ui/react";
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
        <Flex
          mr="4"
          textAlign="right"
          direction="column"
        >
          <Text
            fontSize="small"
            color="gray.400"
          >
          </Text>
          <Link
            onClick={signOut}
            cursor="pointer"
            fontSize="xs"
          >
            Sair
          </Link>
        </Flex>
      )}

      <Avatar size="md" />
    </Flex>
  );
}