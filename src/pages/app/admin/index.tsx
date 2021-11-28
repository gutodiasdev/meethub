import { Flex, Text } from "@chakra-ui/react";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { setupAPIClient } from "../../../services/api";


export default function Admin() {

  return (
    <Flex direction="column" h="100vh">
      <Text>Página de Admin</Text>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');



  return {
    props: {}
  }
}, {
  permissions: ['administrator'],
})