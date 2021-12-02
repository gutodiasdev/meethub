import { Center, Box, Avatar, Heading, Flex, Text, HStack, Tag, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import { setupAPIClient } from "../../../services/api";
import { withSSRAuth } from "../../../utils/withSSRAuth";
import AppContainer from "../../../components/AppContainer";
import { useState } from "react";


const Meet = ({ meet }) => {
  const [meets, setMeets] = useState(meet);

  return (
    <AppContainer>
      <Flex
        bg="white"
        border="1px"
        borderColor="gray.100"
        borderRadius="8"
        width="100%"
        p="8"
      >
        <Box
          flex="1"
          columnSpan={4}
          direction="column"
          h="100%"
        >
          <HStack>
            <Tag size="sm">Marketing</Tag>
            <Tag size="sm">Carreira</Tag>
          </HStack>
          <Heading
            size="md"
            mt="2"
            mb="2"
          >
            {meets.name}</Heading>
          <Text
            color="gray.500"
          >
            {meets.description}</Text>
        </Box>

      </Flex>
      <Flex width="100%" pt="4">
        <Tabs variant="enclosed" width="100%" >
          <TabList>
            <Tab>Agenda</Tab>
            <Tab>Reviews</Tab>
            <Tab>Sobre o especialista</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              Agenda
            </TabPanel>
            <TabPanel>
              Reviews
            </TabPanel>
            <TabPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros a elit faucibus efficitur. Vestibulum varius turpis turpis, vel vulputate diam pretium ac. Aliquam erat volutpat. Aenean elit nisl, venenatis ac nisl ac, interdum posuere ex. Phasellus rhoncus, leo vel viverra molestie, sem ex rhoncus metus, sed fermentum dui diam id odio. Nam pellentesque in elit at sagittis. Pellentesque ornare eu ligula eu pulvinar. Nam consectetur maximus est, eget tincidunt libero dignissim a. Fusce sollicitudin consectetur magna, ac sollicitudin augue convallis quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ac arcu mattis, sagittis nisl ac, laoreet tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut tempus felis.

              Donec dictum ac lacus at molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pulvinar porttitor mi, eu elementum orci scelerisque sit amet. Donec pellentesque tincidunt mi et suscipit. Phasellus lacinia massa eu massa interdum, vel tempor turpis ultrices. Maecenas interdum massa fermentum eros elementum, eget condimentum sapien scelerisque. Phasellus ac viverra orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed augue augue, fringilla in massa vitae, elementum elementum erat. Morbi hendrerit aliquam volutpat. Donec ultricies suscipit leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ac elementum tortor, at mollis dui. Sed ex turpis, sodales fermentum ornare a, imperdiet non mi. Pellentesque ornare metus eu mi cursus, ut dignissim tellus aliquet.

              Morbi vestibulum justo eget tellus varius, ac ultricies elit ornare. Aenean nec eros quam. Integer vitae euismod urna. Aliquam convallis scelerisque justo, quis condimentum elit hendrerit aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus maximus, mauris at aliquam tempor, enim lorem cursus lacus, facilisis faucibus eros dui at sem. Vivamus egestas tellus vitae erat molestie, nec semper sem ultricies. Nullam eget ex quam. Etiam feugiat risus quam, ac lacinia nibh viverra sed. Donec est felis, accumsan venenatis nunc sit amet, accumsan luctus augue. Nullam eu leo arcu. Maecenas sollicitudin posuere lectus at cursus. Phasellus laoreet turpis ut vehicula tristique. Sed eleifend est sem, vel varius felis imperdiet nec. Sed arcu urna, dignissim vitae nulla quis, semper rutrum justo.

              Fusce dapibus quis nulla non venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ac massa eu orci maximus feugiat iaculis at lacus. Nunc semper nibh mi, in rutrum nunc bibendum eu. Curabitur aliquet mi orci, in hendrerit felis accumsan vel. Ut placerat blandit purus at congue. Etiam tincidunt ipsum vel lobortis dignissim. Sed fermentum arcu turpis. Vivamus sagittis at nunc non condimentum. Phasellus rhoncus finibus magna, ut consequat justo sagittis non. Integer posuere elementum bibendum. Nullam sit amet libero nisi.

              Vestibulum semper feugiat lectus ultricies faucibus. Fusce rhoncus justo ac libero dictum ullamcorper. Sed vel orci eros. Pellentesque faucibus, mi sed mollis sodales, orci nibh dignissim erat, nec consequat massa enim sit amet quam. Vestibulum volutpat nec risus in ornare. In in lectus nisl. Duis pellentesque tempor est ac lobortis. Nam tristique dui nec orci finibus semper. Maecenas varius gravida velit, ac convallis purus sagittis in. Vivamus consectetur scelerisque augue eu hendrerit. Praesent ultrices velit vitae mauris suscipit maximus. Praesent molestie arcu nec gravida cursus. In aliquam volutpat pulvinar. Curabitur magna est, scelerisque non consequat vel, eleifend vitae enim.
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
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