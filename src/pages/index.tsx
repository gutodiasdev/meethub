import { Flex } from "@chakra-ui/react";

import { withSSRGuest } from "../../utils/withSSRGuest";
import { Hero } from "../components/Hero";
import { HomeContent } from "../components/HomeContent";
import { UserFooter } from "../components/UserFooter";
import { UserHeader } from "../components/UserHeader";

export default function Home() {
  return (
    <Flex
      direction="column"
      w={1280}
      maxW={1480}
      px="5"
      mx="auto"
    >
      <UserHeader />
      <Hero />
      <HomeContent />
      <UserFooter />
    </Flex>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});