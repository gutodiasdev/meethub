import {
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from 'react-query'
import { setupAPIClient } from "../../../../services/api";
import { api } from "../../../../services/apiClient";
import { withSSRAuth } from "../../../../utils/withSSRAuth";

export default function Meet({ user, meet }) {
  const { isLoading, data, error } = useQuery('Meet', async () => {
    const { data } = await api.get(
      `/meets/my/rooms/myroom/${meet.id}?userId=${user.id}`
    )

    return data
  })

  return (
    <>
      {
        isLoading ? (
          <Flex
            w='100%'
            h='100vh'
            justify='center'
            align='center'
          >
            <Spinner />
          </Flex>
        ) : (
          <Flex
            as='iframe'
            w='100%'
            h='100vh'
            src={data.room}
          >
          </Flex>
        )
      }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const { id } = ctx.query
  const user = await apiClient.get('/me')
  const meet = await apiClient.get(`/meets/${id}`)

  return {
    props: {
      user: user.data,
      meet: meet.data
    }
  }
})