import { withSSRAuth } from "../../utils/withSSRAuth";
import AppContainer from "../../components/AppContainer";
import { setupAPIClient } from "../../services/api";

export default function App() {
  return (
    <AppContainer>

    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const reponse = await apiClient.get('/me')

  return {
    props: {}
  }
})

