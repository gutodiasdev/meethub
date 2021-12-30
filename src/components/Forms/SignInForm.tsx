import { VStack, Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../components/Forms/Input'
import { AuthContext } from '../../contexts/AuthContext'

type UserSignInData = {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const handleSignIn: SubmitHandler<UserSignInData> = async (values, event) => {

    event.preventDefault();

    const data = {
      email: values.email,
      password: values.password,
    }

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
      <Button
        type="submit"
        isLoading={isSubmitting}
      >
        Entrar
      </Button>
    </VStack>
  )
}

