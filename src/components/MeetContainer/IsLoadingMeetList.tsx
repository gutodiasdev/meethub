import { Flex, Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function IsLoadingMeetList() {
  return (
    <Flex direction="column" w="100%">
      <Box padding='6' border="1px" borderColor="gray.300" borderRadius="8px" mb={4}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
      <Box padding='6' border="1px" borderColor="gray.300" borderRadius="8px" mb={4}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
      <Box padding='6' border="1px" borderColor="gray.300" borderRadius="8px" mb={4}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </Flex>
  )
}

export { IsLoadingMeetList }