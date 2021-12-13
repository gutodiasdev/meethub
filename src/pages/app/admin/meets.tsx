import { withSSRAuth } from "../../../utils/withSSRAuth";
import { setupAPIClient } from "../../../services/api";
import { AdminHeader } from "../../../components/AdminHeader";

const AdminMeets = () => {
  return (
    <>
      <AdminHeader />
    </>
  )
}

export default AdminMeets

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
}, {
  roles: ['administrator'],
})