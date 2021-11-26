import { Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Link, Text } from '@chakra-ui/react'
import SignInForm from '../Forms/SignInForm'

export function UserLoginModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Link onClick={onOpen} cursor="pointer">Login</Link>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" isCentered >
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg">Login</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignInForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}