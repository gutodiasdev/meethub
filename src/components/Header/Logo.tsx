import { Flex } from "@chakra-ui/react";
import Image from "next/image";

export function Logo() {
  return (
    <Flex width={256}>
      <Image src="/meethub-logo.svg" width={150} height={80} alt="Meethub" />
    </Flex>
  );
}