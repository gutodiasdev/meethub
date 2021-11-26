import { Flex } from '@chakra-ui/react'
import { Link } from './Link'

export function NavLinks() {
  return (
    <Flex mr="auto" px="5" fontWeight="bold">
      <Link path="/especialistas" linkName="Especialistas" />
      <Link path="/meets" linkName="Meets" />
      <Link path="/para-sua-empresa" linkName="Para sua empresa" />
      <Link path="/seja-um-especialista" linkName="Seja um especialista" />
    </Flex>
  )
}