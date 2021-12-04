import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";

const Meet = ({ meet }) => {

  return (
    <iframe
      src={meet.room}
      allow="camera; microphone; fullscreen; speaker; display-capture"
      width="100%"
      height="100vh"
    ></iframe>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/rooms/${ctx.query.id}`);

  return {
    props: {
      meet: response.data,
    }
  }
})

export default Meet