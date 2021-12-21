import { Flex, Heading, Text } from "@chakra-ui/react";
import { addDays, eachHourOfInterval, endOfDay, endOfToday, endOfTomorrow, format, formatISO, getHours, startOfTomorrow, toDate } from "date-fns";

import AppContainer from "../../../../components/AppContainer";
import Schedule from "../../../../components/Schedule";

export default function MentorSchedule() {
  return (
    <AppContainer>
      <Flex w='100%' direction='column'>
        <Schedule />
      </Flex>
    </AppContainer>
  )
}
