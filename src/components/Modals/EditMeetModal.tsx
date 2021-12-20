import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import FormEditMeet from '../Forms/FormEditMeet';

// import { FormAddImage } from '../Form/FormAddImage';

interface EditMeetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditMeetModal({ isOpen, onClose, }: EditMeetModalProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="5xl" scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent bgColor="pGray.900" mt={4}>
        <ModalHeader>Editar</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <FormEditMeet closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}