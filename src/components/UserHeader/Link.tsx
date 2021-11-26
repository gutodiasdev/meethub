import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

interface LinkProps {
  path: string,
  linkName: string,
}

export function Link({ path, linkName }: LinkProps) {
  return (
    <NextLink href={path} passHref>
      <ChakraLink mx="5" color="gray.600">{linkName}</ChakraLink>
    </NextLink>
  )
}