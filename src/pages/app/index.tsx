import { Flex, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { useContext, useEffect } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { useCan } from "../../services/hooks/users/useCan";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enable: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[300]
    },
    axisTicks: {
      color: theme.colors.gray[300]
    },
    categories: [
      '2021-11-15T00:00:00.000Z',
      '2021-11-16T00:00:00.000Z',
      '2021-11-17T00:00:00.000Z',
      '2021-11-18T00:00:00.000Z',
      '2021-11-19T00:00:00.000Z',
      '2021-11-20T00:00:00.000Z',
      '2021-11-21T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.5,
      opacityTo: 0.1,
    }
  }
}

const userSeries = [
  { name: 'Usuários', data: [31, 120, 10, 28, 61, 18, 109] }
]
const meetSeries = [
  { name: 'Usuários', data: [3, 5, 2, 1, 8, 4, 2] }
]

export default function App() {

  const { user, isAuthenticated } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  });

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        {/*  */}
        {/*  */}
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {}
  }
})