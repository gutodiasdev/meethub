import { Flex, Text, Avatar, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { withSSRAuth } from "../../utils/withSSRAuth";

interface ProfileProps {
  showProfileData?: boolean;
  userEmail?: string;
}

export function Profile({ showProfileData = true, userEmail }: ProfileProps) {

  const { signOut, user } = useContext(AuthContext);

  return (
    <Flex
      align="center"
    >
      <Avatar size="md" />
      {showProfileData && (
        <Flex
          ml="4"
          // textAlign="right"
          direction="column"
        >
          <Text
            fontSize="xs"
            color="gray.500"
          >
            {user.email}
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
    </Flex>
  );
}