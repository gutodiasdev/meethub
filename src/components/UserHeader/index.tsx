import { Flex } from '@chakra-ui/react'
import { LoginBox } from './LoginBox'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'

export function UserHeader() {
  return (
    <Flex
      w="100%"
      h="60px"
      align="center"
      justify="space-between"
    >
      <Logo />
      <NavLinks />
      <LoginBox />
    </Flex>
  )
}