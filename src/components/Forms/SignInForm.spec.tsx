import { render } from '@testing-library/react'
import { SignInForm } from './SignInForm'

test('SignInForm renders properly', () => {
  const { debug } = render(
    <SignInForm />
  )

  debug()
})