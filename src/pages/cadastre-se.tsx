import { VStack, Button } from '@chakra-ui/react'
import { FormEvent, useContext, useState } from 'react'
import { Input } from '../components/Forms/Input'
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
    <VStack as="form" onSubmit={handleSubmit} w="50%" mx="auto" mt={40} spacing={4}>
      <Input
        name="email"
        label="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        name="telephone"
        label="Telefone"
        value={telephone}
        onChange={e => setTelephone(e.target.value)}
      />
      <Input
        name="password"
        label="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">Cadastrar</Button>
    </VStack>
  )
}