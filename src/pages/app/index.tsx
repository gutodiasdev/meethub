import AppContainer from "../../components/AppContainer";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function App() {
  return (
    <AppContainer>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
