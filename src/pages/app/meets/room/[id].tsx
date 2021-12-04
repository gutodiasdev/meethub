import { setupAPIClient } from "../../../../services/api";
import { withSSRAuth } from "../../../../utils/withSSRAuth";
import { useState } from "react";


const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);

  return (
    <iframe
      src={meets.room}
      allow="camera; microphone; fullscreen; speaker; display-capture"
    ></iframe>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/rooms/${ctx.query.id}`);

  console.log(response.data);

  return {
    props: {
      meet: response.data
    }
  }
})

export default Meet