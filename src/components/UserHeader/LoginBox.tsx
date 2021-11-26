import { Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { UserLoginModal } from '../Modals/UserLoginModal'

export function LoginBox() {
  const router = useRouter()

  const handleRegister = () => {
    router.push('/cadastre-se')
  }

  return (
    <Flex align="center" justify="space-between" w="170px">
      <UserLoginModal />
      <Button
        onClick={handleRegister}
        bg="gray.700"
        color="white"
        borderRadius="full"
        variant="none"
      >Cadastre-se</Button>
    </Flex>
  )
}