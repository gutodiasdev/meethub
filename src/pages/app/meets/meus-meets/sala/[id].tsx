import { Flex } from "@chakra-ui/layout";
import { setupAPIClient } from "../../../../../services/api";
import { withSSRAuth } from "../../../../../utils/withSSRAuth";

const Meet = ({ meet }) => {
  
  const obj = Object(meet.members[2]);

  console.log(obj)

  return (
    <Flex as="iframe" w="100%" h="100vh" src={obj.room} allow="camera; microphone; fullscreen; speaker; display-capture">
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`meets/my/rooms/${ctx.query.id}`);

  return {
    props: {
      meet: response.data,
    }
  }
})

export default Meet