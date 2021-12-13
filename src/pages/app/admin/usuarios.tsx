import { Flex } from "@chakra-ui/react";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { setupAPIClient } from "../../../services/api";
import { AdminHeader } from "../../../components/AdminHeader";
import { UsersTable } from "../../../components/UsersTable";

const AdminUsers = () => {
  return (
    <>
      <AdminHeader />
      <Flex w={1280} mx="auto" my={10}>
        <UsersTable />
      </Flex>
    </>
  )
}

export default AdminUsers

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
}, {
  roles: ['administrator'],
})