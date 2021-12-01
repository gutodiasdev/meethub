import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { useState } from "react";


const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);

  return (
    <AppContainer>
      <p>meet id: {meets.id}</p>
    </AppContainer>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { id } = ctx.query;
  const parsedId = id.toString()
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/${parsedId}`);

  console.log(response.data);

  return {
    props: {
      meet: response.data
    }
  }
})

export default Meet