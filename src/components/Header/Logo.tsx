import { Image, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export function Logo() {
  return (
    <NextLink
      href='/app'
      passHref
    >
      <Link>
        <Image
          src="/meethub-logo.svg"
          alt="Meethub"
          maxW='80px'
        />
      </Link>
    </NextLink>
  );
}