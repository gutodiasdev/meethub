import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Logo() {
  const router = useRouter();

  function handleLogoClick() {
    router.push('/')
  }

  return (
    <Image src="/meethub-logo.svg" width="120px" cursor="pointer" onClick={handleLogoClick} />
  )
}