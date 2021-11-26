import { VStack, Button } from '@chakra-ui/react'
import { sign } from 'crypto'
import { GetServerSideProps } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { Input } from '../../components/Forms/Input'
import { AuthContext } from '../../contexts/AuthContext'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();

    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <VStack as="form" onSubmit={handleSubmit} p={8} mx="auto" spacing={4}>
      <Input
        name="email"
        label="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        name="password"
        label="Senha"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">Entrar</Button>
    </VStack>
  )
}

