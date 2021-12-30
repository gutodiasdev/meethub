import { Box, Text, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box
      mb='4'
    >
      <Text
        color="gray.300"
        fontSize="xs"
        letterSpacing="1px"
      >
        {title}
      </Text>
      <Stack mt="4" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}