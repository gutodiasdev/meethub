import { Flex } from "@chakra-ui/react";
import Image from 'next/image'
import { Link } from "../UserHeader/Link";

const AdminHeader = () => {
  return (
    <Flex boxShadow="lg">
      <Flex
        width={1280}
        h={20}
        mx="auto"
        alignItems="center"
      >
        <Image
         src="/meethub-logo.svg" 
         width={100} 
         height={50}
        />
        <Flex mx={16}>
          <Link path="/app/admin/usuarios" linkName="Usuários" />
          <Link path="/app/admin/mentores" linkName="Mentores" />
          <Link path="/app/admin/meets" linkName="Meets" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { AdminHeader }
