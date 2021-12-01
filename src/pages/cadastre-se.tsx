import { Flex } from '@chakra-ui/react'
import { FormEvent, useContext, useState } from 'react'
import { UserRegisterForm } from '../components/Forms/UserRegisterForm'
import { AuthContext } from '../contexts/AuthContext'

export default function UserRegister() {
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')

  const { signUp } = useContext(AuthContext)

  function handleSubmit(event: FormEvent) {

    event.preventDefault();

    const data = {
      email,
      telephone,
      password,
    }

    signUp(data)
  }

  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
    >
      <UserRegisterForm />
    </Flex>
  )
}