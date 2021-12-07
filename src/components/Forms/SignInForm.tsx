import { VStack, Button } from '@chakra-ui/react'
import { FormEvent, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../components/Forms/Input'
import { AuthContext } from '../../contexts/AuthContext'

type UserSignInData = {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  const {register, handleSubmit} = useForm();

  const handleSignIn: SubmitHandler<UserSignInData> = async (values, event: FormEvent) => {

    event.preventDefault();

    const data = {
      email: values.email,
      password: values.password,
    }
    console.log(data);

    await signIn(data);
  }

  return (
    <VStack as="form" onSubmit={handleSubmit(handleSignIn)} p={8} mx="auto" spacing={4}>
      <Input
        name="email"
        id="email"
        label="E-mail"
        {...register('email')}
      />
      <Input
        name="password"
        id="password"
        label="Senha"
        type="password"
        {...register('password')}
      />
      <Button type="submit">Entrar</Button>
    </VStack>
  )
}

