import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { useEffect } from "react";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";

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

export default function Dashboard() {

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
  }, [])

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="white"
            borderRadius="8"
            pb="4"
          >
            <Text fontSize="lg" mb="4">Novos Usuários</Text>
            <Chart options={options} series={userSeries} type="area" height={160} />
          </Box>
          <Box
            p={["6", "8"]}
            bg="white"
            borderRadius="8"
          >
            <Text fontSize="lg" mb="4">Meets Vendidos</Text>
            <Chart options={options} series={meetSeries} type="area" height={160} />
          </Box>

        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me');

  console.log(response.data)

  return {
    props: {}
  }
})